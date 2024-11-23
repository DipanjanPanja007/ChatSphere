import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import express from "express";
import cors from "cors";
import bodyParser from 'body-parser';


import { connectDb } from './config/db.js';
import userRouter from './routes/user.route.js';
import chatRouter from './routes/chat.route.js';
import messageRoutes from './routes/message.route.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import cookieParser from 'cookie-parser';



connectDb();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json())
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000", // Replace with your frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // If using cookies or auth headers

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.send(`API is running at PORT ${PORT}...`)
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRoutes);


app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));