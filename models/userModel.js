const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add username.']
    },
    email: {
        type: String,
        required: [true, 'Please add the email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add the password']
    },
    profile: {
        type: String,
        required: false
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)