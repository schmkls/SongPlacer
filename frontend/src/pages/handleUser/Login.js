import {React, useState} from "react";


import ActuallyLogin from './ActuallyLogin';
import CreateUser from "./CreateUser";

const LOGIN = 'login';
const CREATE_USER = 'create_user';

/**
 * @param props.setToken used by login to setToken received at login 
 * @param props.setUserId used by login to set userId at login 
 * @returns page with alternative to login and create new user
 */
const Login = (props) => {
    
    const [option, setOption] = useState(LOGIN);

    return (
        <div>
            <h2>Welcome to SongPlacer!</h2>
            <h6>(use at own risk)</h6>
            <hr/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type='button' className='btn btn-secondary' onClick={() => setOption(LOGIN)}>Login</button>
                <button type='button' className='btn btn-secondary' onClick={() => setOption(CREATE_USER)}>Create user</button>
            </div>

            {option === LOGIN ?
                    <ActuallyLogin setToken={props.setToken}/>
                :
                    <CreateUser/>
            }
        </div>
    )
}

export default Login;