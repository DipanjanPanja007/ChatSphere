import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
    return (
        <Stack>
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
            <Skeleton height='3rem' margin={"0.5rem 0"} />
        </Stack>
    )
}

export default ChatLoading
