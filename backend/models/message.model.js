import mongoose from "mongoose";


const messageModel = mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            trim: true,
        },
        chat: {
            type: mongoose.Schema.ObjectId,
            ref: "Chat"
        },
    },
    {
        timestamps: true,
    }
)

const Message = mongoose.model("Message", messageModel);

export { Message }
