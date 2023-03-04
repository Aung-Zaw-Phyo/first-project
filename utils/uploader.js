const asyncHandler = require('express-async-handler')
const uuid = require('uuid')
const fs = require('fs')

const saveFileMiddleware = asyncHandler(async(req, res, next) => {
        if(!req.files || !req.files.profile){
            next()
        }else {
            const file = req.files.profile
            const ext = file.name.split('.')[1]
            const name = `${uuid.v4()}.${ext}`
            await file.mv(`./uploads/${name}`)
            if(fs.existsSync(`./uploads/${name}`)){
                req.body.profile = `./uploads/${name}`
                next()
            }else {
                res.status(500)
                throw new Error('File upload is not successful!')
            }
        }
        
})

const saveFile = async(file) => {
    const ext = file.name.split('.')[1]
    const name = `${uuid.v4()}.${ext}`
    await file.mv(`./uploads/${name}`)
    if(fs.existsSync(`./uploads/${name}`)){
        console.log(`./uploads/${name}`)
        return `./uploads/${name}`
    }else {
        return false
    }
}

module.exports = {saveFileMiddleware, saveFile}


