const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required !!!");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error(`User with email: ${email} already exists`)
    }

    const user = await User.create({
        name,
        email,
        password,
        pic,
    });

    if (!user) {
        res.status(400);
        throw new Error("User creation failed ... ")
    }

    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id)
    });


});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error(`User with email ${email} doesn't exists `);
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
        res.status(400);
        throw new Error("Incorrect password");
    }

    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
    })

});

module.exports = { registerUser, authUser }