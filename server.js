const express = require('express')
const connectDb = require('./config/dbConnection2')
const path = require('path')

const app = express()
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 3000

connectDb()
mongoose.set('strictQuery', true)
app.use(fileUpload())
const uploadedFiles = express.static(path.join(__dirname, "uploads"));
app.use("/uploads", uploadedFiles);
app.use(express.json()) // parse or pass the data stream that we receive from the client
app.use('/api/contacts', require('./routes/contactRoute.js'))
app.use('/api/users', require('./routes/userRoute'))
app.use('*', (req, res, next) => {
    res.status(404)
    throw new Error('Route not Found!');
})
app.use(errorHandler)

app.listen(port, () => {
    console.log('Server is running on port: ', port)
})