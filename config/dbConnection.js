const mongoose = require('mongoose')

const connectDb =  async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING) 
        console.log(
            'Database connection host: ', 
            connect.connection.host, 
            ' | ', 
            'Database connection name: ',
            connect.connection.name
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectDb