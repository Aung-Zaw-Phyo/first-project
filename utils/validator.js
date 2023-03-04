const { isValidObjectId } = require("mongoose")

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

module.exports = {validateID}