import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import Signup from '../components/Authentication/Signup'
import Login from '../components/Authentication/Login'
import { useHistory } from 'react-router-dom'

const HomePage = () => {


    const history = useHistory();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if (user) history.push("/chats");

    }, [history]);



    return (
        <Container maxW={'xl'} centerContent>
            <Box
                d='flex'
                justifyContent={"center"}
                p={3}
                bg={'white'}
                w={"100%"}
                m={"40px 0 15px 0"}
                borderRadius={"lg"}
                borderWidth={"1px"}
                backgroundColor={"white"}
            >
                <Text
                    textAlign={"center"}
                    color={"black"}
                    fontSize={"3xl"}
                    fontFamily={"lato-bold-italic"}
                >ChatSphere</Text>
            </Box>

            <Box
                bg={"white"}
                color={"Black"}
                w={"100%"}
                p={4}
                borderRadius={"lg"}
                borderWidth={"1px"}
            >
                <Tabs variant='soft-rounded' >
                    <TabList mb={"1em"}>
                        <Tab width={"50%"}>Login</Tab>
                        <Tab width={"50%"}>Sign Up</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Login />
                        </TabPanel>
                        <TabPanel>
                            <Signup />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default HomePage
