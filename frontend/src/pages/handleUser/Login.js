import {React, useState} from "react";
import usePages from "../usePages";

import CreateUser from "./CreateUser";

const LOGIN = 'login';
const CREATE_USER = 'create_user';


/**
 * @returns page with alternative to login and create new user
 */
const Login = (props) => {

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;
    
    return (
        <div>
            <h2>Welcome to SongPlacer!</h2>
            <h6>(use at own risk)</h6>
            <hr/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type='button' className='btn btn-secondary' onClick={() => window.location.href = pages.authorize.path}>Login</button>
            </div>
        </div>
    )
}

export default Login;