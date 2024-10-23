const express = require("express")
const dotenv = require("dotenv")
const { chats } = require("./data/data.js")
const connectDb = require("./config/db.js")

dotenv.config();

connectDb();

const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
    res.send(`API is running at PORT ${PORT}...`)
});

app.get("/api/chat", (req, res) => {
    res.send(chats)
});

app.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((chat) => {
        return req.params.id === chat._id;
    })
    res.send(singleChat);
})


app.listen(PORT, console.log(`Server has started at PORT ${PORT} `));