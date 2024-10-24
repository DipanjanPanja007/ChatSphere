import express from "express";
const router = express.Router();
import { registerUser, authUser } from "../controllers/user.controller.js"
import { upload } from "../middleware/multer.middleware.js";

router.post('/', upload.single('profilePic'), registerUser);

router.post('/login', authUser);




export default router;