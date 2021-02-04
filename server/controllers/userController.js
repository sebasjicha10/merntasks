const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {

    // Check for errors
    const erros = validationResult(req)
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
    }

    // Get email and password
    const { email, password } = req.body
    
    try {
        // Check that the submitted user is unique
        let user = await User.findOne({email})

        if(user) {
            return res.status(400).json({msg: 'User already registered'})
        }

        // Create New User
        user = new User(req.body)

        // Hash the password
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(password, salt)
        
        // Save User
        await user.save()

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
            res.status(200).json({token})
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('An error occurred')
    }
}