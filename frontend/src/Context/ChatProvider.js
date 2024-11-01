import { createContext, useContext, useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";

const ChatContext = createContext()


const ChatProvider = ({ children }) => {

    const [user, setUser] = useState();
    const history = useHistory();

    useEffect(() => {
        // fetch user info fron localstorage
        const userInfo = JSON.parse(localStorage.getItem("userInfo"))

        if (!userInfo) {
            history.push("/")
        }
        setUser(userInfo);

    }, [history]);

    return <ChatContext.Provider value={{ user, setUser }}
    >{children}
    </ChatContext.Provider>
};

export const ChatState = () => {
    return useContext(ChatContext)
}


export default ChatProvider;