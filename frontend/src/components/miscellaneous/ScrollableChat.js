import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../Context/ChatProvider'
import { isLastMessage, isSameSender, isSameUser, setSenderMargin } from '../../config/ChatLogin';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((currMessage, index) => (
                    <div style={{ display: "flex" }} key={currMessage._id} >
                        {
                            (isLastMessage(messages, index, user.data.user._id) ||
                                isSameSender(messages, currMessage, index, user.data.user._id)
                            ) && (
                                <Tooltip
                                    label={currMessage.sender.name}
                                    placement='bottom-start'
                                    hasArrow
                                >
                                    <Avatar
                                        marginTop={"7px"}
                                        mr={1}
                                        size={"sm"}
                                        cursor={"pointer"}
                                        name={currMessage.sender.name}
                                        src={currMessage.sender.profilePic}
                                    />
                                </Tooltip>
                            )
                        }
                        <span
                            style={{
                                backgroundColor: `${currMessage.sender._id === user.data.user._id ? "#BFA7FA" : "#F0B99E"}`,
                                borderRadius: "1.5rem",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                marginLeft: setSenderMargin(messages, currMessage, index, user.data.user._id),
                                marginTop: isSameUser(messages, currMessage, index) ? 3 : 10
                            }}
                        >{currMessage.content}</span>
                    </div>
                ))
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat
