import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'


const NewAccount = (props) => {

    // Get values from Context
    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const { message, authenticated, registerUser} = authContext

    // In case user has authenticated, registered, or for duplicate registration
    useEffect(() => {
        if(authenticated) {
            props.history.push('/projects')
        }

        if(message) {
            showAlert(message.msg, message.category)
        }
        // estlint-disable-next-line
    }, [message, authenticated, props.history ])

    // Sign Up State
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirm: ''
    })

    // Extract from user
    const { name, email, password, confirm } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // When user wants to sign up
    const onSubmit = e => {
        e.preventDefault()

        // Validate for no empty fields
        if(name.trim() === '' || email.trim() === '' || password.trim() === '' || confirm.trim() === '') {
            showAlert('All fields are mandatory', 'alert-error')
            return
        }

        // At least 6 characters password
        if(password.length < 6) {
            showAlert('Password must have at least 6 characters', 'alert-error')
            return
        }

        // Check for the 2 passwords to be the same
        if(password !== confirm) {
            showAlert('The 2 passwords are not the same', 'alert-error')
            return
        }

        // Send it to Action
        registerUser({
            name,
            email,
            password
        })

    }

    return (  
        <div className='form-user'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) 
            : null}
            <div className='container-form shadow-dark'>
                <h1>Create an Account</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className='field-form'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Your Name'
                            value={name}
                            onChange={onChange}
                        />
                    </div>
                    <div className='field-form'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Your Email'
                            value={email}
                            onChange={onChange}
                        />
                    </div>
                    <div className='field-form'>
                        <label htmlFor='email'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Your Password'
                            value={password}
                            onChange={onChange}
                        />
                    </div>
                    <div className='field-form'>
                        <label htmlFor='confirm'>Confirm Password</label>
                        <input 
                            type='password'
                            id='confirm'
                            name='confirm'
                            placeholder='Confirm Your Password'
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>

                    <div className='field-form'>
                        <input type='submit' className='btn btn-primary btn-block'
                        value='Sign Up' />
                    </div>
                </form>

                <Link to={'/'} className='link-account' >
                    Login
                </Link>

            </div>
        </div>
    )
}
 
export default NewAccount