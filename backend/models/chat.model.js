/*
 * Content: 
 * chatName
 * isGroupChat
 * users
 * latestMessage
 * groupAdmin
 */

const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
    {
        chatName: {
            type: String,
            trim: true,
        },
        isGroupChat: {
            type: Boolean,
            default: false,
        },
        users: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        },
        latestMessage: {
            type: mongoose.Types.ObjectId,
            ref: "Message",
            trim: true,
        },
        groupAdmin: {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true
    }
)

const Chat = mongoose.model("Chat", chatModel);
module.exports = Chat;