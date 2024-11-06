import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import ChatLoading from './ChatLoading.js'
import axios from 'axios';
import { getSender } from '../../config/ChatLogin.js';

const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, chats, setChats, user } = ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            console.log(`user from hook: ${user}`);

            // allChatsData with the loggedIn User
            const { data } = await axios.get("http://localhost:5000/api/chat", {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            setChats(data.data);

        } catch (error) {
            toast({
                title: "Error occoured",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [])

    return (
        <>
            <Box
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir={"column"}
                alignItems={"center"}
                p={3}
                bg={"white"}
                width={{ base: "100%", md: "31%" }}
                borderRadius={"lg"}
                borderWidth={"1px"}
            >
                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    display={"flex"}
                    width={"100%"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                >
                    My chats
                    <Button
                        display={"flex"}
                        fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                        rightIcon={<i class="fa-solid fa-plus"></i>}
                    >
                        New Group Chat
                    </Button>
                </Box>

                <Box
                    d="flex"
                    flexDir="column"
                    p={3}
                    backgroundColor="#F8F8F8"
                    w="100%"
                    h="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {
                        chats ? (
                            <Stack overflowY={"scroll"} > {
                                chats.map((chat) => (
                                    <Box
                                        onClick={() => setSelectedChat(chat)}
                                        cursor="pointer"
                                        bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                        color={selectedChat === chat ? "white" : "black"}
                                        px={3}
                                        py={2}
                                        borderRadius="lg"
                                        key={chat._id}
                                    >
                                        <Text>
                                            {
                                                !chat.isGroupChat ?
                                                    getSender(loggedUser, chat.users)
                                                    : chat.chatName
                                            }
                                        </Text>
                                    </Box>
                                ))
                            } </Stack>
                        ) : (
                            <ChatLoading />
                        )
                    }
                </Box>

            </Box>
        </>
    )
}

export default MyChats
