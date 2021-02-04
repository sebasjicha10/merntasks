import React, { useContext, useEffect } from 'react'
import Project from './Project'
import projectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alerts/alertContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group'


const ListProjects = () => {

    // Get projects from Initial State
    const projectsContext = useContext(projectContext)
    const {message, projects, getProjects} = projectsContext
    
    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    // Get Projects when component loads
    useEffect(() => {

        // In case of error
        if(message) {
            showAlert(message.msg, message.category)
        }

        getProjects()
        // eslint-disable-next-line
    }, [message])

    // Check if projects have content
    if(projects.length === 0) return <p>Click on "New Project" to start adding Projects</p>

    return (  
    
        <ul className='list-projects'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) : null}
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames={project}
                    >
                        <Project
                            project={project}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>

        </ul>
    )
}
 
export default ListProjects