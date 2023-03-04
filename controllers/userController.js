const asyncHandler = require('express-async-handler')
const User = require('./../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {saveFile} = require('./../utils/uploader')

// @desc Register
// @route POST /api/users/register
// @access Public
const register = asyncHandler (async(req, res) => {

    const {username, email, password} = req.body
    if(!username || !email || !password){
        res.status(400)
        throw new Error('Please fill the all fields.')
    }
    const userAvalible = await User.findOne({email})
    if(userAvalible) {
        res.status(400)
        throw new Error('Email has already been taken.')
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const data = {
        username,
        email,
        password: hashedPassword,
        profile: req.body.profile ?? null
    }
    const result = await User.create(data)
    if(!result) {
        res.status(500)
        throw new Error('Server error occured.')
    }
    let user = result.toObject()
    if(req.files && req.files.profile){
        const filePath = await saveFile(req.files.profile)
        if(filePath) {
            const result = await User.findByIdAndUpdate(user._id, {profile: filePath})
            if(!result) {
                res.status(500)
                throw new Error('Server error occured.')
            }
            const data = await User.findById(result._id)
            user = data.toObject()
            delete user['password']
            delete user["__v"];
            console.log(user)
            res.status(201).json(user)
        }else {
            await User.findByIdAndDelete(user._id)
            res.status(500)
            throw new Error('Server Error Occured')
        }
    }
    delete user['password']
    delete user["__v"];
    res.status(201).json(user)
});

// @desc Login
// @route POST /api/users/login
// @access Public
const login = asyncHandler (async(req, res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(400)
        throw new Error("Pleas fill the all fields.")
    }
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        const obj = user.toObject()
        delete obj['password']
        delete obj['__v']
        const token = jwt.sign({
                user: obj
            }, 
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        )
        res.status(200).json({token})
    }else {
        res.status(401)
        throw new Error('Your data is invalid.')
    }
});

// @desc Current
// @route GET /api/users/current
// @access Private
const current = asyncHandler (async(req, res) => {
    res.status(200).json(req.user)
});

// @desc Current
// @route GET /api/users/current
// @access Private
const getUsers = asyncHandler (async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
});

module.exports = {register, login, current, getUsers}