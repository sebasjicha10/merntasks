import React, {useState, useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import AlertContext from '../../context/alerts/alertContext'
import AuthContext from '../../context/authentication/authContext'


const Login = (props) => {

    // Get values from Context
    const alertContext = useContext(AlertContext)
    const {alert, showAlert} = alertContext

    const authContext = useContext(AuthContext)
    const { message, authenticated, login} = authContext

    // In case user or password don't exist
    useEffect(() => {
        if(authenticated) {
            props.history.push('/projects')
        }

        if(message) {
            showAlert(message.msg, message.category)
        }
        // estlint-disable-next-line
    }, [message, authenticated, props.history ])

    // Login State
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    // Extract from user
    const { email, password } = user

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // When user wants to login
    const onSubmit = e => {
        e.preventDefault()

        // Validate for empty fields
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All fields are mandatory', 'alert-error')
        }

        // Send it to Action
        login({email, password})
    }

    return (  
        <div className='form-user'>
            {alert ? (<div className={`alert ${alert.category}`}>{alert.msg}</div>) 
            : null}
            <div className='container-form shadow-dark'>
                <h1>Login</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input type='submit' className='btn btn-primary btn-block'
                        value='Login' />
                    </div>

                </form>

                <Link to={'new-account'} className='link-account' >
                    Create an Account
                </Link>
            </div>

        </div>
    )
}
 
export default Login