import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

const Project = ({project}) => {

    // Get the projects' states 
    const projectsContext = useContext(projectContext)
    const { handleCurrentProject } = projectsContext

    // Get the tasks' states 
    const tasksContext = useContext(taskContext)
    const { getTasks } = tasksContext

    // Handle current project needs
    const selectProject = id => {
        handleCurrentProject(id) // Set the current Project
        getTasks(id) // Filter tasks when clicking 
    }

    return (  
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => selectProject(project._id)}
            >{project.name} </button>
        </li>

    )
}
 
export default Project