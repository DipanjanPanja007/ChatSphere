import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, Drawer, useDisclosure, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, useToast, Spinner, } from '@chakra-ui/react'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'
import ChatLoading from './ChatLoading.js'
import UserListItem from '../UserAvatar/UserListItem.js'
import axios from 'axios'

const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])          // stores the searched users array
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const { user, setSelectedChat, chats, setChats } = ChatState()
    const history = useHistory()
    const toast = useToast()

    const logoutHandler = () => {
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


            const response = await axios.get(`http://localhost:5000/api/user?search=${search}`, {
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
            console.log(response)

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
                'http://localhost:5000/api/chat',
                { userId },
                config
            );

            console.log("Access chat with 2nd person-response: ", response);

            console.log("chats : ", chats);

            if (!chats.find((c) => c._id === response.data._id)) setChats([response, ...chats])

            setSelectedChat(response)


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
                            <i class="fa-solid fa-bell"  ></i>
                            {/* <MenuList></MenuList> */}
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<i class="fa-solid fa-angle-down"></i>}  >
                            <Avatar size={"sm"} cursor={"pointer"} name={user.data.user.name} src={user.data.user.profilePic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModal user={user}>
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
