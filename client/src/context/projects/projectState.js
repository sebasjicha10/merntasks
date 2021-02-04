import React, { useReducer } from 'react'
import projectContext from './projectContext'
import projectReducer from './projectReducer'
import { 
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT,
    ERROR_PROJECT,
    VALIDATE_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT 
} from '../../types'
import clientAxios from '../../config/axios'


const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        formError: false,
        project: null,
        message: null
    }

    // Dispatch to ejecute actions
    const [state, dispatch] = useReducer(projectReducer, initialState)

    // Functions for the CRUD
    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // Get Projects
    const getProjects = async () => {

        try {
            const result = await clientAxios.get('/api/projects')
            dispatch({
                type: GET_PROJECTS,
                payload: result.data
            })   
        } catch (error) {
            const alert = {
                msg: 'An error ocurred',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    // Add new project
    const addProject = async project => {

        try {
            const result = await clientAxios.post('/api/projects', project)
            console.log(result)
    
            // Insert the project in state
            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
            
        } catch (error) {
            const alert = {
                msg: 'An error ocurred',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    // Validate form when erros
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    } 

    // User clicked on a project
    const handleCurrentProject = projectId => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: projectId
        })
    }

    // Deletes a project
    const deleteProject = async projectId => {
     
        try {
            await clientAxios.delete(`/api/projects/${projectId}`)
            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'An error ocurred',
                category: 'alert-error'
            }
            dispatch({
                type: ERROR_PROJECT,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                form: state.form,
                formError: state.formError,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                handleCurrentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState