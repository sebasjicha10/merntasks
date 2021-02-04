const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

// Create server
const app = express()

// Connect the Data Base
connectDB()

// Inable cors
app.use(cors())

// Inable express.json
app.use(express.json({ extended: true }))

// App's Port
const PORT = process.env.PORT || 4000

// Import Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

// Start the App
app.listen(PORT, () => {
    console.log(`The server is working on the ${PORT} port`)
}) 
