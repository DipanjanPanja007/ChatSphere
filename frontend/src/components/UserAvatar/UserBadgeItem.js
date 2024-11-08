import { Box, CloseButton } from '@chakra-ui/react'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction }) => {
    return (
        <Box
            padding={"0.1rem 0 0.1rem 1rem"}
            borderRadius="lg"
            m={1}
            mb={2}
            variant="solid"
            fontSize={"0.8rem"}
            backgroundColor="purple"
            color={"white"}
            cursor="pointer"
            onClick={handleFunction}
            display={"flex"}
            flexWrap={"nowrap"}
            alignItems={"center"}
        >
            {user.name}
            <CloseButton pl={0.5} fontSize={"0.5rem"} paddingRight={"0"} />

        </Box>
    )
}

export default UserBadgeItem
