const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth')
const { check } = require('express-validator')

// Project Creation
// api/projects
router.post('/',
    auth,
    [
        check('name', 'The Project must have a name').not().isEmpty()
    ],  
    projectController.createProject
)

// Get all projects
router.get('/',
    auth,
    projectController.getProjects
)

// Update project via ID
router.put('/:id', 
    auth,
    [
        check('name', 'The Project must have a name').not().isEmpty()
    ],  
    projectController.updateProject
)

// Delete a project
router.delete('/:id', 
    auth,
    projectController.deleteProject
)

module.exports = router