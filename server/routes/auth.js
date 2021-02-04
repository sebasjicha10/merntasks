// Routers to authenticate users
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

// Login
// api/auth
router.post('/', 
    authController.authenticateUser
)

// Get the authenticated user
router.get('/',
    auth,
    authController.userAuthenticated
)

module.exports = router