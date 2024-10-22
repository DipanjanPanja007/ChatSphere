import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react';
import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPass, setShowPass] = useState(false);

    const handelClickPass = () => setShowPass(!showPass);

    const postDetails = () => { };
    const submitHandler = () => { };


    return (
        <VStack spacing={"5px"}>


            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>

                <Input
                    placeholder='Enter your email'
                    onChange={(event) => {
                        setEmail(event.target.value)
                    }}
                />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showPass ? "text" : "password"}
                        placeholder='Enter Password'
                        onChange={(event) => {
                            setPassword(event.target.value)
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
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Login
            </Button>


            <Button
                colorScheme="red"
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={() => {
                    setEmail("guest@example.com")
                    setPassword("123456")
                }}
            >Login with Guest User</Button>

        </VStack>
    )

}

export default Login
