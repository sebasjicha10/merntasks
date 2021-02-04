const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req, res) => {

    // Check for errors
    const erros = validationResult(req)
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
    }

    // Get the email and password
    const {email, password} = req.body

    try {
        // Check for registered user
        let user = await User.findOne({email})
        if(!user) {
            res.status(400).json({msg: "The user doesn't exit"})
        }

        // Check password
        const correctPassword = await bcryptjs.compare(password, user.password)
        if(!correctPassword) {
            return res.status(400).json({msg: 'Incorrect Password'})
        }

        // Create and Sign the JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error

            // Confirmation Message
            res.json({token})
        })

    } catch (error) {
        console.log(error)
    }
}

// Get authenticated user
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: 'An error occurred'})
    }
}