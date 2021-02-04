import React, { useReducer } from 'react'
import AuthReducer from './authReducer'
import AuthContext from './authContext'
import clientAxios from '../../config/axios'
import tokenAuth from '../../config/token'
import {
    SIGNUP_SUCCESSFUL,
    SIGNUP_ERROR,
    GET_USER,
    LOGIN_SUCCESSFUL,
    LOGIN_ERROR,
    SIGNOUT
} from '../../types'


const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch] = useReducer(AuthReducer, initialState)

    const registerUser = async data => {
        try {
            const response = await clientAxios.post('/api/users', data)
            console.log(response.data)

            dispatch({
                type: SIGNUP_SUCCESSFUL,
                payload: response.data
            })

            // Get the user
            userAuthenticated()

        } catch (error) {
            // console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            })
        }
    }

    // Returns the authenticated user
    const userAuthenticated = async () => {
        const token = localStorage.getItem('token')
        if(token) {
            tokenAuth(token)
        }

        try {
            const response = await clientAxios.get('/api/auth')
            // console.log(response)
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })

        } catch (error) {
            console.log(error.response)
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // For Login
    const login = async data => {
        try {
            const response = await clientAxios.post('/api/auth', data)

            dispatch({
                type: LOGIN_SUCCESSFUL,
                payload: response.data
            })

            // Get the user
            userAuthenticated()
            
        } catch (error) {
            console.log(error.response.data.msg)
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    // Logout
    const signout = () => {
        dispatch({
            type: SIGNOUT
        })
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                login,
                userAuthenticated,
                signout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState