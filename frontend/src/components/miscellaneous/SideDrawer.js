import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, } from '@chakra-ui/react'
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal'
import { useHistory } from 'react-router-dom'

const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user } = ChatState()
    const history = useHistory()

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        history.push('/')
    }

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
                    <Button>
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
                            <Avatar size={"sm"} cursor={"pointer"} name={user.name} src={user.profilePic} />
                        </MenuButton>

                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>


                    </Menu>
                </div>

            </Box>
        </>
    )
}

export default SideDrawer
