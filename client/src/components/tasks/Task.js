import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'


const Task = ({task}) => {

    // Get project if active
    const projectsContext = useContext(projectContext)
    const { project } = projectsContext

    // Get the tasks' states 
    const tasksContext = useContext(taskContext)
    const { deleteTask, getTasks, updateTask, saveCurretTask } = tasksContext

    // Get the project
    const [currentProject] = project

    // When Delete Task Button is Clicked
    const handleTaskDelete = id => {
        deleteTask(id, currentProject._id)
        getTasks(currentProject.id)
    }

    // Switch Tasks' State
    const switchState = task => {

        if(task.completed) {
            task.completed = false
        } else {
            task.completed = true
        }
        updateTask(task)
    }

    // Add current Task when user wants to edit
    const selectTask = task => {
        saveCurretTask(task)
    }

    return (  
        <li className='task shadow'>
            <p>{task.name}</p>
            <div className='state'>
                {task.completed 
                    ? 
                        (
                            <button
                                type='button'
                                className='complete'
                                onClick={() => switchState(task)}
                            >Completed</button>
                        )
                    :
                        (
                            <button
                                type='button'
                                className='incomplete'
                                onClick={() => switchState(task)}
                            >Incompleted</button>
                        )
                }
            </div>
            <div className='actions'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={() => selectTask(task)}
                >Edit</button>

                <button
                    type='button'
                    className='btn btn-secundary'
                    onClick={() => handleTaskDelete(task._id)}
                >Delete</button>
            </div>
        </li>
    )
}
 
export default Task