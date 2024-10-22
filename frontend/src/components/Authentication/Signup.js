import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [picture, setPicture] = useState();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const handelClickPass = () => setShowPass(!showPass);
    const handelClickConfirmPass = () => setShowConfirmPass(!showConfirmPass);

    const postDetails = () => { };
    const submitHandler = () => { };


    return (
        <VStack spacing={"5px"}>
            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>

                <Input
                    placeholder='Enter your name'
                    onChange={(event) => {
                        setName(event.target.value)
                        // console.log(name)
                    }}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>

                <Input
                    placeholder='Enter your email'
                    onChange={(event) => {
                        setEmail(event.target.value)
                        // console.log(email)
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
                            // console.log(password)
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

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={showConfirmPass ? "text" : "password"}
                        placeholder='Confirm Password'
                        onChange={(event) => {
                            setPassword(event.target.value)
                            // console.log(password)
                        }}
                    />
                    <InputRightElement width={"4.5 rem"} >
                        <Button
                            h={"1.74rem"}
                            size={"small"}
                            bg={"white"}
                            marginRight={"0.5rem"}
                            padding={"0.3rem"}
                            onClick={handelClickConfirmPass}
                        >{showConfirmPass ? "Hide" : "Show"}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='picture' isRequired>
                <FormLabel>
                    Upload your Profile Picture
                </FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image/*'
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Submit
            </Button>

        </VStack>
    )
}

export default Signup
