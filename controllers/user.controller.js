import bcrypt from "bcrypt"

import { User } from "../models/user.model.js"
import { sendCookies } from "../utils/features.js"

// GET MY PROFILE:
export const getMyProfile = (req, res) => {

    res.json({
        success: true,
        user: req.user,
    })
}

// LOGIN:
export const login = async (req, res, next) => {

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password")

    if (!user) return res.status(404).json({
        success: false,
        message: "Invalid Email",
    });
    // else {
    //     res.json({
    //         success: true,
    //         message: "User Matched Successfully"
    //     })
    // }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(404).json({
        success: false,
        message: "Invalid Password",
    });

    sendCookies(user, res, `welcome Back ${user.name}`)
}



// REGISTER:
export const register = async (req, res) => {

    const { name, email, password } = req.body;
    let user = await User.findOne({ email })

    if (user) return res.status(404).json({
        success: false,
        message: "User Already Exist",
    });

    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword })
    sendCookies(user, res, "User Registered Successfully");



}


export const logout = (req, res) => {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        success: true,
        message: "LogOut",
    })
}



















// MY API
// export const createUser = async (req, res) => {

//     const { name, email, password } = req.body
//     await User.create({
//         name,
//         email,
//         password,
//     })

//     res.json({
//         success: true,
//         message: "Data is Saved"
//     })

// }

// export const getAllUsers = async (req, res) => {
//     const user = await User.find({})
//     res.json({
//         success: true,
//         user

//     })

// }
