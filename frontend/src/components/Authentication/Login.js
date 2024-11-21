import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom'


const Login = () => {

    const [info, setInfo] = useState({
        email: "",
        password: "",
    });
    const toast = useToast()
    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const handelClickPass = () => setShowPass(!showPass);

    const submitHandler = async () => {
        if (!info.email.trim() || !info.password.trim()) {
            toast({
                title: "All fields are required!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        console.log(`email: ${info.email}, pass: ${info.password}`);


        const data = {
            email: info.email,
            password: info.password
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log(responseData);


            // const userInfoForLocalStorage = await response.data.user.json()

            localStorage.setItem("userInfo", JSON.stringify(responseData));

            // localStorage.setItem("testItem", "testValue");
            // console.log(localStorage.getItem("testItem")); // should return "testValue"


            // console.log(`responseData : ${responseData}`);

            if (!response.ok) {
                toast({
                    title: "Failed to register!",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                throw new Error(responseData.message || "Failed to register");
            }
            console.log("response created");

            toast({
                title: "Login Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setInfo({
                email: "",
                password: ""
            })

            setLoading(false)
            history.push("/chats");


        } catch (error) {
            console.log("error: ", error)
            toast({
                title: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        } finally {
            setLoading(false);
        }



    };


    return (
        <VStack spacing={"5px"}>


            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>

                <Input
                    value={info.email}
                    placeholder='Enter your email'
                    onChange={(event) => {
                        setInfo((prev) => ({ ...prev, email: event.target.value }))
                    }}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        value={info.password}
                        type={showPass ? "text" : "password"}
                        placeholder='Enter Password'
                        onChange={(event) => {
                            setInfo((prev) => ({ ...prev, password: event.target.value }))
                        }}
                    />
                    <InputRightElement width={"4.5 rem"} >
                        <Button
                            h={"1.74rem"}
                            size={"small"}
                            bg={"white"}
                            marginRight={"0.5rem"}
                            padding={"0.3rem"}
                            onClick={handelClickPass}
                        >{showPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width={"100%"}
                isLoading={loading}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >Login</Button>


            <Button
                colorScheme="red"
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={() => {
                    setInfo((prev) => ({ ...prev, email: "guest@example.com", password: "123456" }))
                }}
            >Login with Guest User</Button>

        </VStack>
    )

}

export default Login
