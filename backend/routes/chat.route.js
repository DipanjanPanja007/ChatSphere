import express from "express";
const router = express.Router();
import { verifyJWT } from "../middleware/auth.middleware.js"
import { accessChat } from "../controllers/chat.controller.js";


router.post('/', verifyJWT, accessChat);               // access or create one-to-one chat, 

export default router; 
