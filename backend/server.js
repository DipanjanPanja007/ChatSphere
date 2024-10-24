import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import express from "express";
import { connectDb } from './config/db.js';
import userRouter from './routes/user.route.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';




connectDb();
const PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (_, res) => {
    res.send(`API is running at PORT ${PORT}...`)
});

app.use("/api/user", userRouter);
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, console.log(`Server has started at PORT ${PORT}`));