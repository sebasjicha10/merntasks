import React, { useReducer } from 'react'
import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import clientAxios from '../../config/axios'
import { 
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK 
} from '../../types'


const TaskState = props => {
    const initialState = {
        projectTasks: [],
        taskError: false,
        selectedTask: null
    }

    // Create dispath and state
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    // Get the Project's Tasks
    const getTasks = async project => {

        try {
            const result = await clientAxios.get('/api/tasks', {params: {project}})
            console.log(result)
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Add Task to the current Project
    const addTask = async task => {
        try {
            const result = await clientAxios.post('/api/tasks', task)
            console.log(result)
            dispatch({
                type: ADD_TASK,
                payload: task
            })
            
        } catch (error) {
            console.log(error)
        }
    }

    // Validates and shows Error if necessary 
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }

    // Delete Task by id
    const deleteTask = async (id, project) => {

        try {
            await clientAxios.delete(`/api/tasks/${id}`, {params: {project}})
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
            
        } catch (error) {
            console.log(error)
        }

    }

    // Edit a Task
    const updateTask = async task => {
        try {
            const result = await clientAxios.put(`/api/tasks/${task._id}`, task)

            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Gets a Task to edit
    const saveCurretTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })
    }

    // Clean selected Task
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
                projectTasks: state.projectTasks,
                taskError: state.taskError,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                saveCurretTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState