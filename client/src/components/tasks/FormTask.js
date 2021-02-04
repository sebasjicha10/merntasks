import React, { useContext, useState, useEffect } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'


const FormTask = () => {

    // Get project if active
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Get the tasks' states 
    const tasksContext = useContext(taskContext)
    const { selectedTask, taskError, addTask, validateTask, getTasks, updateTask, cleanTask } = tasksContext

    // Detects if a Task is selected
    useEffect(() => {
        if(selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask])

    // Form State
    const [task, setTask] = useState({
        name: '',
    })

    // Get the Project's Name
    const { name } = task

    // No project selected
    if(!project) return null

    // Get the current project
    const [currentProject] = project

    // Read Form Values
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Validate
        if(name.trim() === '') {
            validateTask()
            return
        }

        // Check if it's editing or new task
        if(selectedTask === null) {
            // Add New Task to Tasks' state
            task.project = currentProject._id
            addTask(task)
        } else {
            // Updates an existing task
            updateTask(task)

            // Delete the selected Task from State
            cleanTask()
        }

        // Get and filter current project's tasks
        getTasks(currentProject.id)

        // Reset the Form 
        setTask({
            name: ''
        })
    }

    return (  
        <div className='form'>
            <form
                onSubmit={handleSubmit}
            >
                <div className='container-input'>
                    <input 
                        type='text'
                        className='input-text'
                        placeholder="Task's Name"
                        name='name'
                        value={name}
                        onChange={handleChange}
                    />
                </div>
                <div className='container-input'>
                    <input 
                        type='submit'
                        className='btn btn-primary btn-submit btn-block'
                        value={selectedTask ? 'Edit Task' : 'Add Task'}
                    />
                </div>
            </form>

            {taskError ? <p className="message error">The Task must have a Name</p> : null}
        </div>
    )
}
 
export default FormTask