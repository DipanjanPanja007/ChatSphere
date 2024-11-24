import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';
import axios from "axios"
import UserListItem from '../UserAvatar/UserListItem.js';





const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameLoading, setRenameLoading] = useState(false);
    const toast = useToast();


    const { selectedChat, setSelectedChat, user } = ChatState();



    const handleAddUser = async (userToAdd) => {
        if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
            toast({
                title: "Error occoured",
                description: "User already exists",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            });
            return;
        }

        if (selectedChat.groupAdmin._id != user.data.user._id) {
            toast({
                title: "Error occoured",
                description: "Only Admin can add members",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            })
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`
                }
            }

            const { data } = await axios.put("http://localhost:5000/api/chat/groupadd", {
                chatId: selectedChat._id,
                userId: userToAdd._id,
            },
                config,
            )

            setSelectedChat(data.data)
            setFetchAgain(!fetchAgain)
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error occoured",
                description: "Someting went wrong while adding user into group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            })
        }

    };

    const handleRemoveUser = async (userToRemove) => {

        if (selectedChat.groupAdmin._id !== user.data.user._id && userToRemove._id !== user.data.user._id) {
            toast({
                title: "Error occoured",
                description: "Only Admin can remove members",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            })
            return;
        }

        try {
            setLoading(true)
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`
                }
            }

            const { data } = await axios.put("http://localhost:5000/api/chat/groupremove", {
                chatId: selectedChat._id,
                userId: userToRemove._id,
            },
                config,
            )

            userToRemove._id === user.data.user._id ? setSelectedChat() : setSelectedChat(data.data)
            setFetchAgain(!fetchAgain)
            fetchMessages();
            setLoading(false)
        } catch (error) {
            toast({
                title: "Error occoured",
                description: "Someting went wrong while adding user into group",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            })
        }
    };

    const handelRename = async () => {
        /*
         * check for valid input
         * if input valid, update in db 
         */
        if (!groupChatName) return;

        try {
            setRenameLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`
                }
            }

            const { data } = await axios.put("http://localhost:5000/api/chat/rename", {
                chatId: selectedChat._id,
                newChatName: groupChatName,
            },
                config,
            )

            setSelectedChat(data.data);
            setFetchAgain(!fetchAgain);
        } catch (error) {
            toast({
                title: "Error occoured",
                description: "Failed to update groupChat name",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-middle"
            })
        } finally {
            setRenameLoading(false);
        }
        setGroupChatName("");

    };


    const handleSearch = async (query) => {
        if (!query) {
            toast({
                title: "Please Enter something in Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            });
            return;
        }
        try {
            setLoading(true)

            const { data } = await axios.get(`http://localhost:5000/api/user?search=${query}`, {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            // console.log("user array :response from searched user: ", data.data.users);
            setSearchResult(data.data.users);
            console.log(data.data.users)
            setLoading(false)

        } catch (error) {
            toast({
                title: "Error occoured while Searching User",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            });
        }
    };


    return (
        <>
            <IconButton display={{ base: "flex" }} icon={<i class="fa-regular fa-eye"></i>} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        textAlign={"center"}
                        fontFamily={"Work sans"}
                        fontSize={"2.2rem"}>
                        {selectedChat.chatName.toUpperCase()}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text
                            margin={"1rem"}
                        >
                            {
                                `Group Admin is: ${selectedChat.groupAdmin.name}`
                            }
                        </Text>
                        <Box
                            width={"100%"}
                            display={"flex"}
                            flexWrap={"wrap"}
                            paddingBottom={"0.5rem"}
                        >
                            {
                                selectedChat.users.map((u) => (
                                    <UserBadgeItem key={u._id} user={u} handleFunction={() => handleRemoveUser(u)} />
                                ))
                            }
                        </Box>
                        <FormControl
                            display={"flex"}
                        >
                            <Input
                                placeholder='Chat Name'
                                marginBottom={3}
                                value={groupChatName}
                                onChange={(e) => (setGroupChatName(e.target.value))}
                            />
                            <Button
                                variant={"solid"}
                                backgroundColor={"teal"}
                                marginLeft={1}
                                onClick={handelRename}
                                color={"white"}
                            >Update</Button>
                        </FormControl>

                        <FormControl>
                            <Input
                                placeholder='Add User into Group'
                                marginBottom={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        {
                            !loading ? (
                                searchResult.map((u) => (
                                    <UserListItem
                                        key={u._id}
                                        user={u}
                                        handleFunction={() => handleAddUser(u)}
                                    />
                                ))
                            ) : (
                                <Spinner ml={"auto"} display={"flex"} />
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' onClick={() => handleRemoveUser(user.data.user)}>
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGroupChatModal
