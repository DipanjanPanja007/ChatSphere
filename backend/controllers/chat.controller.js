import { User } from "../models/user.model.js"
import { Chat } from "../models/chat.model.js"
import asyncHandler from "express-async-handler";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



const accessChat = asyncHandler(async (req, res) => {
    /*
     * step#1: you can access user object due to verified User only allowed (verifyJWT)
     * step#2: provided userId of 2nd person( with whom you will chat )
     * step#3: if Chat object found with users you and 2nd person, send it after removing credentials/secrets
     * step#4: if Chat not found, create one and send it after removing credentials
     */

    // step#2: provided userId of 2nd person( with whom you will chat )
    const { userId } = req.body;

    if (!userId) {
        throw new ApiError(400, "UserId not found to chat with ... ")
    }

    // step#3: search for chat with 2nd person
    let isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } },
        ]
    }).populate("users", "-password")                   // removing credentials/secrets
        .populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email",
    });

    // if chat present, send it
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        // step#4: Chat not found, create one and send it after removing credentials
        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],        // my_id , 2ndPerson_id
        }

        try {
            const createChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createChat._id }).populate(
                "users",
                "-password"
            );
            res.status(200).json(FullChat);
            return res
                .status(201)
                .json(
                    new ApiResponse(
                        200,
                        FullChat
                    )
                )
        } catch (error) {
            throw new ApiError(
                400,
                `something went wrong while creating new chat ${error?.message}`
            )
        }

    }

});






export { accessChat } 