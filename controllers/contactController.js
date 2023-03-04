const asyncHandler = require('express-async-handler')
const Contact = require('./../models/contactModel')

// @desc Get all contacts
// @route GET /api/contacts
// @access Public
const getContacts = asyncHandler (async(req, res) => {
    const contacts = await Contact.find({user_id: req.user._id}).select('-__v -createdAt -updatedAt').populate({path: 'user_id', select: 'username email'});
    res.status(200).json(contacts)
});

// @desc Create new contact
// @route POST /api/contacts
// @access Public
const createContact = asyncHandler(async(req, res) => {
    const {name, email, phone} = req.body
    if(!name || !email || !phone) {
        res.status(404)
        throw new Error('All fields are mandatory!')
    }
    const contact = await Contact.create({name, email, phone, user_id: req.user._id})
    if(!contact) {
        res.status(500)
        throw new Error('Server error.')
    }
    res.status(200).json(contact)
});

// @desc  Get single contact
// @route GET /api/contacts
// @access Public
const getContact =  asyncHandler(async(req, res, next) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact not found.')
    }
    res.status(200).json(contact)
});

// @desc Update contact
// @route PUT /api/contacts
// @access Public
const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact not found.')
    }
    if(contact.user_id.toString() !== req.user._id){
        res.status(403)
        throw new Error("You don't have permission to update this contact.")
    }   
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body)
    if(!result){
        res.status(500)
        throw new Error('Server error occured.')
    }
    const updatedContact = await Contact.findById(req.params.id)
    res.status(200).json(updatedContact)
});

// @desc Delete contacts
// @route DELETE /api/contacts
// @access Public
const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if(!contact){
        res.status(404)
        throw new Error('Contact not found.')
    }
    if(contact.user_id.toString() !== req.user._id){
        res.status(403)
        throw new Error("You don't have permission to delete this contact.")
    }
    const result = await Contact.findByIdAndDelete(req.params.id)
    if(!result) {
        res.status(500)
        throw new Error('Server error occured.')
    }
    res.status(200).json(result)
});

module.exports = {getContacts, createContact, getContact, updateContact, deleteContact}