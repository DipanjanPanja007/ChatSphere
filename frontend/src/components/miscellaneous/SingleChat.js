import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { getSender, getSenderFull } from '../../config/ChatLogin';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import ScrollableChat from './ScrollableChat';
import io from "socket.io-client"
// import Lottie from 'react-lottie'
// import animationData from '../animation/typing.json'

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

// const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice",
//     },
// };


const SingleChat = ({ fetchAgain, setFetchAgain }) => {

    const toast = useToast();
    const { user, selectedChat, setSelectedChat } = ChatState();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState();
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);


    useEffect(() => {
        socket = io(ENDPOINT)
        socket.emit("setup", user.data.user);
        socket.on("connected", () => setSocketConnected(true))
        socket.on("typing", () => setIsTyping(true))
        socket.on("stop_typing", () => setIsTyping(false))
    }, [])

    useEffect(() => {
        fetchMessages();
        selectedChatCompare = selectedChat;          // for notification/show logic...
    }, [selectedChat])

    useEffect(() => {
        socket.on("message_recieved", (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                // give notification
            }
            else {
                setMessages([...messages, newMessageReceived])
            }
        });
    });

    const typingHandler = async (e) => {
        setNewMessage(e.target.value);

        // typing indecator logic

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true)                                  // here i am setting it true 'cause typingHandler is triggered wherever typing has started
            socket.emit("typing", selectedChat._id)
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timediff = timeNow - lastTypingTime
            if (timediff >= timerLength && typing) {
                socket.emit("stop_typing", selectedChat._id)
                setTyping(false)
            }
        }, timerLength);
    }


    const sendMessage = async (event) => {
        if (event.key === "Enter" && newMessage.trim()) {
            socket.emit("stop_typing", selectedChat._id)
            try {
                setNewMessage("")
                const { data } = await axios.post(`http://localhost:5000/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, {
                    headers: {
                        Authorization: `Bearer ${user.data.accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });
                console.log(data);

                socket.emit('new_message', data.data)

                setMessages([...messages, data.data])


            } catch (error) {
                toast({
                    title: "Error occoured while sending message",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-right"
                })
                console.log(`error message: ${error.message}`);

            }
        }
    }

    const fetchMessages = async () => {
        if (!selectedChat) return;

        try {
            setLoading(true)
            const { data } = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`, {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`
                }
            });
            console.log(data);
            setMessages(data.data)
            setLoading(false)
            socket.emit("join_chat", selectedChat._id)

        } catch (error) {
            toast({
                title: "Error occoured while fetching particular chat message",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            })
            console.log(`error is: ${error.message}`);

        }
    }




    return (
        <>
            {
                selectedChat ? (
                    <>
                        <Text
                            fontSize={{ base: "28px", md: "30px" }}
                            pb={3}
                            px={2}
                            w="100%"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent={{ base: "space-between" }}
                            alignItems="center"
                        >
                            <IconButton
                                display={{ base: "flex", md: "none" }}
                                icon={<i class="fa-solid fa-arrow-left"></i>}
                                onClick={() => setSelectedChat("")}
                            />{
                                !selectedChat.isGroupChat ? (
                                    <>{getSender(user, selectedChat.users)}
                                        <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                                    </>
                                ) : (
                                    <>
                                        {selectedChat.chatName.toUpperCase()}
                                        {
                                            <UpdateGroupChatModal
                                                fetchAgain={fetchAgain}
                                                setFetchAgain={setFetchAgain}
                                                fetchMessages={fetchMessages}
                                            />
                                        }
                                    </>
                                )
                            }
                        </Text>
                        <Box
                            display="flex"
                            flexDir="column"
                            justifyContent="flex-end"
                            p={3}
                            bg="#E8E8E8"
                            w="100%"
                            h="100%"
                            borderRadius="lg"
                            overflowY="hidden"
                        >
                            {
                                loading ? (
                                    <Spinner
                                        size={"xl"}
                                        width={20}
                                        height={20}
                                        alignSelf={"center"}
                                        margin={"auto"}
                                    />
                                ) : (
                                    <div
                                        display={"flex"}
                                        flexDir={"column"}
                                        overflowY={"scroll"}
                                        scrollbar-width={"none"}>
                                        <ScrollableChat messages={messages} />
                                    </div>
                                )
                            }

                            <FormControl onKeyDown={sendMessage} isRequired marginTop={3} >

                                {
                                    isTyping ? (<div>
                                        {/* <Lottie
                                            width={70}
                                            options={defaultOptions}
                                            style={{ marginBottom: 15, marginLeft: 0 }}
                                        /> */}
                                        Typing....
                                    </div>) : (<></>)
                                }
                                <Input
                                    variant={"filled"}
                                    backgroundColor={"#C2C2C2"}
                                    placeholder='Kuch lik na....'
                                    onChange={typingHandler}
                                    value={newMessage}
                                />
                            </FormControl>
                        </Box>
                    </>
                ) : (
                    <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                        <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                            Click on a user to start chatting
                        </Text>
                    </Box>
                )
            }
        </>
    )
}

export default SingleChat
