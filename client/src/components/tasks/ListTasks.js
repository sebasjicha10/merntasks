import React, { Fragment, useContext } from 'react'
import Task from '../tasks/Task'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ListTasks = () => {

    // Get Projects from Initial State
    const projectsContext = useContext(projectContext)
    const { project, deleteProject } = projectsContext

    // Get the Project's Tasks 
    const tasksContext = useContext(taskContext)
    const { projectTasks } = tasksContext

    // No project selected
    if(!project) return <h2>Select a Project</h2>

    // Get the current Project
    const [currentProject] = project

    // Delete Project
    const handleDelete = () => {
        deleteProject(currentProject._id)
    }

    return (  
        <Fragment>
            <h2>Project: {currentProject.name}</h2>
            <ul className='list-tasks'>
                {projectTasks.length === 0
                    ? (<li className='task'><p>There are no tasks</p></li>)
                    : 
                    <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task.id}
                                timeout={200}
                                classNames='task'
                            >
                                <Task 
                                    task={task}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>

            <button 
                type='button'
                className='btn btn-delete'
                onClick={handleDelete}
            >Delete Project &times;</button>
        </Fragment>
    )
}
 
export default ListTasks