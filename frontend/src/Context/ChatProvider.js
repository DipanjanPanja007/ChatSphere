import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const ChatContext = createContext()


const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState([])
    const [notification, setNotification] = useState([])

    const history = useHistory();

    useEffect(() => {
        // fetch user info fron localstorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))

        if (!userInfo) {
            history.push("/")
        }
        setUser(userInfo);

    }, [history]);

    return <ChatContext.Provider
        value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats, notification, setNotification }}
    >{children}
    </ChatContext.Provider>
};

export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider;