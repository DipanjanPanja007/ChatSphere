import React, { useEffect, useState } from 'react';
import axios from "axios";
// import { Button } from '@chakra-ui/react';

const ChatPage = () => {

    const [chats, setChats] = useState([])

    const fetchChat = async () => {
        const { data } = await axios.get("/api/chat");
        setChats(data);
        console.log(data);
    }
    useEffect(() => {
        fetchChat();
    }, [])

    return (
        <div>
            {
                chats.map((chat) => (
                    <div key={chat._id}>{chat.chatName}</div>
                ))
            }
        </div>
    )
}

export default ChatPage
