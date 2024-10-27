import { User } from "../models/user.model.js"
import asyncHandler from "express-async-handler";
import generateToken from "../config/generateToken.js"
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {

    // take input name, email, password
    const { name, email, password } = req.body;          // remove pic as we will send it through middleware

    // validation - not empty
    if ([name, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required...");
    }


    // check if user with same email already exists or not
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError(400, `User with email: ${email} already exists`)
    }

    // check if user provided profilePicture or not

    // console.log("req.file: ", req.file);
    let profilePicPath = "";
    if (req.file) {
        profilePicPath = req.file.path;
    }
    // console.log("pf path: ", profilePicPath);
    let profilePic = ""
    if (profilePicPath) {
        const picName = req.file?.filename;
        profilePic = await uploadOnCloudinary(profilePicPath, picName);
    }


    // create user 
    const user = await User.create({
        name: name,
        email: email,
        password: password,
        profilePic: profilePic?.url || undefined,
    });

    // if user not created, throw error
    if (!user) {
        throw new ApiError(400, "User creation failed ... ")
    }

    // return info
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        token: generateToken(user._id)
    });


});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    console.log(`from authUser, email: ${email} and password: ${password}`);


    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(400, `User with email ${email} doesn't exists `);
    }

    const checkPassword = await user.isPasswordCorrect(password);

    if (!checkPassword) {
        throw new ApiError(400, "Incorrect password");
    }

    return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
    })

});

export { registerUser, authUser }