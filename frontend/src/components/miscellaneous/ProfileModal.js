import React from 'react'
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div>
            {
                children ?
                    (<span onClick={onOpen} >{children}</span>)
                    :
                    (<IconButton display={{ base: "flex" }} icon={<i class="fa-regular fa-eye"></i>} onClick={onOpen} />)
            }
            <Modal size={"lg"} isCentered blockScrollOnMount={true} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize={"4xl"}
                        fontFamily={"Work sans"}
                        display={"flex"}
                        justifyContent={"center"}
                    >
                        {user.name}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} flexDirection={"column"} alignItems={"center"} >
                        <Image
                            borderRadius={"full"}
                            boxSize={"13rem"}
                            src={user.profilePic}
                            alt={user.name}
                            display={"flex"}
                            justifyContent={"center"}
                            marginBottom={"1rem"}
                        />
                        <Text fontWeight='bold' mb='1rem' textAlign={"center"} fontSize={"1.4rem"}
                        >{user.email}</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' margin={"2 4 2 4 "} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ProfileModal
