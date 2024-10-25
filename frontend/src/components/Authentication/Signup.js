import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react';


const Signup = () => {

    const [email, setEmail] = useState();
    const [name, setName] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const toast = useToast()


    const handelClickPass = () => setShowPass(!showPass);
    const handelClickConfirmPass = () => setShowConfirmPass(!showConfirmPass);


    const submitHandler = async () => {
        if (password !== confirmPassword) {
            toast({
                title: "Passwords do not match!",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const profilePicFile = document.getElementById("profilePic").files[0] || null;
        console.log(`profilePic: ${profilePicFile}`);

        formData.append('profilePic', profilePicFile);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(`data : ${data}`);
            console.log(`response : ${response}`);

            if (!response.ok) {
                throw new Error(data.message || "Failed to register");
            }

            // Handle success (e.g., redirect or show success message)
            toast({
                title: "Registration Successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // Optionally reset the form
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            document.getElementById("profilePic").value = ""
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
            <FormControl id='first-name' isRequired>
                <FormLabel>
                    Name
                </FormLabel>

                <Input
                    value={name}
                    placeholder='Enter your name'
                    onChange={(event) => {
                        setName(event.target.value)
                    }}
                />
            </FormControl>

            <FormControl id='email' isRequired>
                <FormLabel>
                    Email
                </FormLabel>

                <Input
                    value={email}
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
                        value={password}
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
                        value={confirmPassword}
                        type={showConfirmPass ? "text" : "password"}
                        placeholder='Confirm Password'
                        onChange={(event) => {
                            setConfirmPassword(event.target.value)
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
                    id='profilePic'
                // onChange={(e) => postDetails(e)}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                width={"100%"}
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                loading={loading}
            >
                Submit
            </Button>

        </VStack>
    )
}

export default Signup
