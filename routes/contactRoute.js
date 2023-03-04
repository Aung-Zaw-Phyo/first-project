const express = require('express')
const router = express.Router()
const validator = require('./../utils/validator')
const Joi = require('joi')

const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controllers/contactController')
const validateTokenHandler = require('./../middleware/validateTokenHandler')

const contactValidateSchema = Joi.object({
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .min(13)
        .required(),
    phone: Joi.string()
        .min(9)
        .max(14)
        .required()
}) // .options({ allowUnknown: false });

router.use(validateTokenHandler)
router.route('/').get(getContacts).post( validator.validateContact(contactValidateSchema),createContact)

router.route('/:id')
    .get([ validator.validateID(), getContact])
    .put([ validator.validateID(), updateContact])
    .delete([ validator.validateID(), deleteContact])

module.exports = router