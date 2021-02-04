const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    // Read token's header
    const token = req.header('x-auth-token')
    
    // Check for a token
    if(!token) {
        return res.status(401).json({msg: 'Permission denied'})
    }

    // Validate token
    try {
        const cipher = jwt.verify(token, process.env.SECRET)
        req.user = cipher.user
        next()
    } catch (error) {
        res.status(401).json({msg: 'Unvalid Token'})
    }
}