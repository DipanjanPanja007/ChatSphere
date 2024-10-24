import express from "express";
import dotenv from "dotenv"
import { connectDb } from './config/db.js';
import userRouter from './routes/user.route.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';



dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send(`API is running at PORT ${PORT}...`)
});

app.use("/api/user", userRouter);
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server has started at PORT ${PORT} `));