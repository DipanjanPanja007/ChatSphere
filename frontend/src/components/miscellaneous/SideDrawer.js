import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, useToast, Spinner, Tag, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import ChatLoading from './ChatLoading.js'
import UserListItem from '../UserAvatar/UserListItem.js'
import axios from 'axios'
import { getSender } from '../../config/ChatLogic.js'

const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])          // stores the searched users array
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user, setUser, setSelectedChat, chats, setChats, notification, setNotification } = ChatState()
    const history = useHistory()
    const toast = useToast()

    const logoutHandler = () => {
        setUser(null);
        localStorage.removeItem("userInfo");

        // document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        history.push('/')
    }

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left"
            });
            return;
        }
        try {
            setLoading(true)


            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/api/user?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`,
                    'Content-Type': 'application/json',
                },
                credentials: "include",
            });

            // const response = await fetch(`http://localhost:5000/api/user?search=${search}`, {
            //     method: 'GET',
            //     headers: {
            //         Authorization: `Bearer ${user.data.accessToken}`,
            //         'Content-Type': 'application/json',
            //     },
            //     credentials: "include",
            // })

            setSearchResult(response.data.data.users);
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

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.data.accessToken}`,
                    'Content-Type': 'application/json',
                }
            };

            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_URI}/api/chat`,
                { userId },
                config
            );




            if (!chats.find((c) => c._id === response.data._id)) setChats([response.data, ...chats])

            setSelectedChat(response.data)


        } catch (error) {
            toast({
                title: "Error occoured while fetching chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <>
            <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                bg={"white"}
                width={"100%"}
                padding={"5px 10px"}
                borderWidth={"5px"}
            >
                <Tooltip label="Search User to Chat" hasArrow placement='bottom-end' >
                    <Button onClick={onOpen} >
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <Text display={{ base: "none", md: "flex" }} px='4'>Search User</Text>
                    </Button>
                </Tooltip>

                <Text fontSize={"2xl"}  >
                    ChatSphere
                </Text>

                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <NotificationBadge
                                count={notification.length}
                                effect={Effect.SCALE}
                            />
                            <i class="fa-solid fa-bell"></i>
                        </MenuButton>
                        <MenuList paddingLeft={2}>
                            {
                                !notification.length && "No New Messages"
                            }
                            {
                                notification.map((noti) => (
                                    <MenuItem
                                        cursor={"pointer"}
                                        key={noti._id}
                                        onClick={() => {
                                            setSelectedChat(noti.chat);
                                            setNotification(notification.filter((n) => n !== noti));
                                        }}
                                        onMouseOver={console.log("hi")}
                                    >
                                        {
                                            noti.chat.isGroupChat ?
                                                `New Message from ${noti.chat.chatName}` :
                                                `New Message from ${getSender(user, noti.chat.users)}`
                                        }
                                    </MenuItem>
                                ))
                            }
                        </MenuList>

                    </Menu>

                    <Menu>
                        <MenuButton as={Button} rightIcon={<i class="fa-solid fa-angle-down"></i>}  >
                            <Avatar size={"sm"} cursor={"pointer"} name={user.data.user.name} src={user.data.user.profilePic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModal user={user.data.user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>
                                <Text marginRight={"0.5rem"}>Logout</Text>
                                <i class="fa-solid fa-right-from-bracket"></i>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </div>

            </Box>

            <Drawer placement='left' onClose={onClose} isOpen={isOpen} blockScrollOnMount={true} >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Search User here</DrawerHeader>

                    <DrawerBody>
                        <Box display={"flex"} marginBottom={"1rem"}>
                            <Input
                                placeholder='Search by name or email'
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch} > Go</Button>
                        </Box>

                        {loading ? <ChatLoading /> :
                            (
                                searchResult?.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                ))
                            )
                        }
                        {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

        </>
    )
}

export default SideDrawer
