import React, { useContext, useEffect } from 'react'
import AuthContenct from '../../context/authentication/authContext'


const Bar = () => {

    // Get auth info
    const authContext = useContext(AuthContenct)
    const {user, userAuthenticated, signout} = authContext

    useEffect(() => {
        userAuthenticated()
        // estlint-disable-next-line
    }, [])

    return (  
        <header className='app-header'>
            {user ? <p className='name-user'>Hey <span>{user.name}</span></p> : null}
            <nav className='nav-principal'>
                <button
                    className='btn btn-blank logout'
                    onClick={() => signout()}
                >Logout</button>
            </nav>
        </header>
    )
}
 
export default Bar