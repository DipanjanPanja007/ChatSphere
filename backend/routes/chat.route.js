import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js"
import { accessChat, createGroupChat, fetchChats, renameGroup } from "../controllers/chat.controller.js";


router.route("/").post(verifyJWT, accessChat);                  // access or create one-to-one chat, 
router.route("/").get(verifyJWT, fetchChats);                   // to fetch all chats with me
router.route("/group").post(verifyJWT, createGroupChat);        //
router.route("/rename").put(verifyJWT, renameGroup);            //
// router.route("/groupremove").put(verifyJWT, removeFromGroup);   //
// router.route("/groupadd").put(verifyJWT, addToGroup);           //



export default router; 
