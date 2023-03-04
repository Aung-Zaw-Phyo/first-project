const { isValidObjectId } = require("mongoose")
const asyncHandler = require('express-async-handler')

const validateID = () => {  // isValidObjectId method check whether not mongoose id format, but not check that params.id whether not exist in db.
    return (req, res, next) => {
        if(!isValidObjectId(req.params.id)){
            res.status(404)
            throw new Error('Not found.')
        }else {
            next()
        }
    }
}

const validateContact = (schema) => {
    return asyncHandler((req, res, next) => {
        const result = schema.validate(req.body)
        if(result.error){
            res.status(400)
            throw new Error(result.error.details[0].message.split('"').join(""))
        }else {
            next()
        }
    })
}

module.exports = {validateID, validateContact}