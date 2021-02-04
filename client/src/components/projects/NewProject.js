import React, { Fragment, useState, useContext } from 'react'
import projectContext from '../../context/projects/projectContext'


const NewProject = () => {

    // Get the form's state 
    const projectsContext = useContext(projectContext)
    const { form, showForm, formError, addProject, showError } = projectsContext
 
    // Project's name
    const [project, setProject] = useState({
        name: ''
    })

    // Extract project's name
    const { name } = project
    
    // Read input Content
    const onChangeProject = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    // When user submits project
    const onSubmitProject = e => {
        e.preventDefault()

        // Validate Project
        if(name === '') {
            showError()
            return
        }

        // Add to state
        addProject(project)

        // Reset the form
        setProject({
            name: ''
        })
    }

    // Show Form
    const handleFormClick = () => {
        showForm()
    }

    return (  
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={handleFormClick}
            >New Project</button>

            {
                form ? (
                    <form 
                        className='form-new-project' 
                        onSubmit={onSubmitProject}
                    >
                        <input  
                            type='text'
                            className='input-text'
                            placeholder="Project's Name"
                            name='name'
                            value={name}
                            onChange={onChangeProject}
                        />
        
                        <input 
                            type='submit'
                            className='btn btn-block btn-primary'
                            value='Add Project'
                        />
                    </form>
                ) : null

            }
            { formError ? <p className="message error">The Project must have a Name</p> : null}

        </Fragment>
    )
}
 
export default NewProject