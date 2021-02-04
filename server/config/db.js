const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB Connected')
    } catch(error) {
        console.log(error)
        process.exit(1) // Stop de App
    }
}

// dbUser
// dbUserPassword
// https://cloud.mongodb.com/v2/601346fa2568996a85236eef#clusters

module.exports = connectDB