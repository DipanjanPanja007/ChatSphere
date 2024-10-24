const express = require("express")
const dotenv = require("dotenv")
const { chats } = require("./data/data.js")
const connectDb = require("./config/db.js")
const userRouter = require("./routes/user.route.js")
const { notFound, errorHandler } = require("./middleware/error.middleware.js")

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