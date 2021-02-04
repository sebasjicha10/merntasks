import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import Bar from '../layout/Bar'
import FormTask from '../tasks/FormTask'
import ListTasks from '../tasks/ListTasks'
import AuthContenct from '../../context/authentication/authContext'


const Projects = () => {

    // Get auth info
    const authContext = useContext(AuthContenct)
    const {userAuthenticated} = authContext

    useEffect(() => {
        userAuthenticated()
    }, [])

    return (  
        <div className='container-app'>

            <Sidebar />

            <div className='main-section'>
                <Bar />
                <main>
                <FormTask />
                    <div className='container-tasks'>
                        <ListTasks />
                    </div>
                </main>
            </div>
        </div>
    )
}
 
export default Projects