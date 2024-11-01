import { Box, Button, Text, Tooltip, Menu, MenuButton, MenuList, Avatar, MenuItem, MenuDivider, } from '@chakra-ui/react'
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'

const SideDrawer = () => {

    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingChat, setLoadingChat] = useState()

    const { user } = ChatState()

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
                            <MenuItem>My Profile</MenuItem>
                            <MenuDivider />
                            <MenuItem>Logout</MenuItem>
                        </MenuList>


                    </Menu>
                </div>

            </Box>
        </>
    )
}

export default SideDrawer
