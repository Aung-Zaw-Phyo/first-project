const express = require('express')
const router = express.Router()
const {register, login, current, getUsers} = require('./../controllers/userController')
const validateTokenHandler = require('./../middleware/validateTokenHandler')
const {saveFileMiddleware} = require('./../utils/uploader')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/current').get( validateTokenHandler, current)

router.route('/').get(getUsers)

module.exports = router