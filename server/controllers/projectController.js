const Project = require('../models/Project')
const { validationResult } = require('express-validator')

exports.createProject = async (req, res) => {

    // Check for errors
    const erros = validationResult(req)
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
    }

    try {
        // Create new Project
        const project = new Project(req.body)

        // Safe the creator via jwt
        project.creator = req.user.id

        // Save project
        project.save()
        res.json(project)
        
    } catch (error) {
        console.log('error')
        res.status(500).send('Error ocurred')
    }
}

// Get current user projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({creator: req.user.id}).sort({created: -1})
        res.json(projects)
    } catch (error) {
        console.log(error)
        res.status(500).send('Error ocurred')
    }
}

// Update a Project
exports.updateProject = async (req, res) => { 

    // Check for errors
    const erros = validationResult(req)
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
    }  

    // Get project's info
    const {name} = req.body
    const newProject = {}

    if(name) {
        newProject.name = name
    }

    try {
        // Check the ID
        let project = await Project.findById(req.params.id)

        // Check if the project exists
        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // Verify project's creator
        if(project.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        }

        // Update
        project = await Project.findByIdAndUpdate({_id: req.params.id}, {$set: newProject}, {new: true})

        res.json({project})

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }

}

// Deletes project by ID
exports.deleteProject = async (req, res) => {
    
    try {
        // Check the ID
        let project = await Project.findById(req.params.id)

        // Check if the project exists
        if(!project) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // Verify project's creator
        if(project.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        } 

        // Delete project
        await Project.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Project deleted'})

    } catch (error) {
        console.log(error)
        res.status(500).send('Server error')
    }
}