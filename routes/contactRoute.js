const express = require('express')
const router = express.Router()
const validator = require('./../utils/validator')

const {getContacts, createContact, getContact, updateContact, deleteContact} = require('../controllers/contactController')
const validateTokenHandler = require('./../middleware/validateTokenHandler')

router.use(validateTokenHandler)
router.route('/').get(getContacts).post(createContact)

router.route('/:id')
    .get([ validator.validateID(), getContact])
    .put([ validator.validateID(), updateContact])
    .delete([ validator.validateID(), deleteContact])

module.exports = router