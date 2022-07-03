import {React, useState} from "react";
import ActuallyLogin from '../actuallyLogin/ActuallyLogin';
import CreateUser from "../createUser/CreateUser";
import Globals from '../../../globals/Globals.css'

const LOGIN = 'login';
const CREATE_USER = 'create_user';

/**
 * @param props.setToken used by login to setToken received at login 
 * @param props.setUserId used by login to set userId at login 
 * @returns page with alternative to login and create new user
 */
const Login = (props) => {
    
    const [option, setOption] = useState(LOGIN);


    //todo, option skip login and nav to nearme
    return (
        <div className='margin-top'>
            <hr/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type='button' className='btn btn-secondary' onClick={() => setOption(LOGIN)}>Login</button>
                <button type='button' className='btn btn-secondary' onClick={() => setOption(CREATE_USER)}>Create user</button>
            </div>

            {option === LOGIN ?
                    <>
                        <p>(login needed for adding songplacer and access your library)</p>
                        <ActuallyLogin setToken={props.setToken}/>
                    </>
                :   
                    <>
                        <p>(user needed for adding songplacer and access your library)</p>
                        <CreateUser/>
                    </>
            }
        </div>
    )
}

export default Login;