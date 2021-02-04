const Task = require('../models/Task')
const Project = require('../models/Project')
const { validationResult } = require('express-validator')

// Create new a task
exports.createTask = async (req, res) => {

    // Check for errors
    const erros = validationResult(req)
    if(!erros.isEmpty()) {
        return res.status(400).json({erros: erros.array()})
    }

    try {
        // Get the project and check if it exists
        const {project} = req.body

        const projectExists = await Project.findById(project)
        if(!projectExists) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // Check if current project belongs to auth user
        if(projectExists.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        }

        // Create the task
        const task = new Task(req.body)
        await task.save()
        res.json({task})
        
    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred')
    } 

}

// Get tasks by project
exports.getTasks = async (req, res) => {

    try {
        // Get the project and check if it exists
        const {project} = req.query

        const projectExists = await Project.findById(project)
        if(!projectExists) {
            return res.status(404).json({msg: 'Project not found'})
        }

        // Check if current project belongs to auth user
        if(projectExists.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        }

        // Get the tasks
        const tasks = await Task.find({project}).sort({created: -1})
        res.json({tasks})

    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred') 
    }

}

// Update a task
exports.updateTask = async (req, res) => {
    try {
        // Get the project and check if it exists
        const {project, name, completed} = req.body

        // Check if task exists
        let task = await Task.findById(req.params.id)
        if(!task) {
            return res.state(404).json({msg: "Task doesn't exist"}) 
        }

        const projectExists = await Project.findById(project)

        // Check if current project belongs to auth user
        if(projectExists.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        }

        // Create new Object with new info
        const newTask = {}
        newTask.name = name
        newTask.completed = completed
        
        // Save task
        task = await Task.findOneAndUpdate({_id: req.params.id}, newTask, {new: true})

        res.json({task})

    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred') 
    }
}

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        // Get the project and check if it exists
        const {project} = req.query

        // Check if task exists
        let task = await Task.findById(req.params.id)
        if(!task) {
            return res.state(404).json({msg: "Task doesn't exist"}) 
        }

        const projectExists = await Project.findById(project)

        // Check if current project belongs to auth user
        if(projectExists.creator.toString() !== req.user.id) {
            return res.state(401).json({msg: 'Not authorized'})
        }

        // Delete
        await Task.findOneAndRemove({_id: req.params.id})
        res.json({msg: 'Task Deleted'})

    } catch (error) {
        console.log(error)
        res.status(500).send('An error occurred') 
    }
}