import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

import User from '../models/User.js'

// Generating token
const genToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: '60d' });
}

// Login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id),
            createdAt: user.createdAt
        })
    } else {
        res.status(401).json({ message: 'Invalid Credentials' })
    }
})

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    /* Since Email is unique, 
    we will check if the user already exists */
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ message: 'User already exists' })
    }

    const user = await User.create({ name, email, password });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: genToken(user._id)
        })
    } else {
        res.status(400).json({ message: 'Invalid user data' })
    }
})


export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }

        const updateUser = await user.save()

        res.status(200).json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: genToken(updateUser._id),
            createdAt: updateUser.createdAt
        })
    } else {
        res.status(401).json('User does not exist')
    }
})