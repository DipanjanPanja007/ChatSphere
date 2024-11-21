import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from "../UserAvatar/UserListItem.js";
import UserBadgeItem from '../UserAvatar/UserBadgeItem.js';

const GroupChatModal = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const { user, chats, setChats } = ChatState()

    const handelSearch = async (query) => {
        setSearch(query)
        if (!query) {
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
            setLoading(false)


        } catch (error) {
            toast({
                description: "Failed to search users while creating group chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left"
            })
        }


    };

    const handleDelete = (deleteUser) => {
        setSelectedUsers(selectedUsers.filter((user) => user._id !== deleteUser._id));
    };

    const handleGroup = (userToAdd) => {
        if (selectedUsers.some((user) => user._id === userToAdd._id)) {
            toast({
                title: "Error occoured",
                description: "User already added",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            })
            return;
        }
        setSelectedUsers([...selectedUsers, userToAdd]);
        // console.log(selectedUsers);
    };



    const handelSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Error occoured",
                description: "Fill all the fields",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            })
            return;
        }
        if (selectedUsers.length < 2) {
            toast({
                title: "Error occoured",
                description: "Group Chat needs atleast 3 people bro !!! ",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            })
            return;
        }
        try {
            const { data } = await axios.post(`http://localhost:5000/api/chat/group`,
                {
                    groupName: groupChatName,
                    users: JSON.stringify(selectedUsers.map(user => user._id))
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.data.accessToken}`,
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (!data) {
                console.log("group chat is not created");
            }
            console.log(data);

            setChats([data, ...chats]);

            onclose();
            toast({
                title: `Group chat: ${groupChatName} is created`,
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            })
        } catch (error) {
            toast({
                title: "Error occoured while creating group chat",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top-middle"
            })
        }
    };

    useEffect(() => {
        console.log('Selected Users:', selectedUsers);
    }, [selectedUsers]);


    return (
        <>
            <Button onClick={onOpen}>{children}</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"2rem"}
                        display={"flex"}
                        justifyContent={"center"}
                    >Create Group Chat</ModalHeader>
                    <ModalCloseButton />


                    <ModalBody display={"flex"} flexDir={"column"} alignItems={"center"} >
                        <FormControl>
                            <Input placeholder='Chat Name' marginBottom={"2rem"} onChange={(e) => setGroupChatName(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <Input placeholder='Add Users ....' marginBottom={"1rem"} onChange={(e) => handelSearch(e.target.value)} />
                        </FormControl>
                        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"} >
                            {
                                selectedUsers.map((user) => (
                                    <UserBadgeItem key={user._id} user={user} handleFunction={() => handleDelete(user)} />
                                ))
                            }
                        </Box>
                        {
                            loading ? <div>Loading....</div> : (
                                searchResult?.slice(0, 4).map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                            )
                        }
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handelSubmit}>
                            Create Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default GroupChatModal
