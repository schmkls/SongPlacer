import {React, useState} from "react";
import axios from 'axios';
import pagesHelp from "../../../pagesHelp";
import accessHelp from "../../../accessHelp";


const NOT_LOGGED_IN = 1;
const FAIL = 2;
const SUCCESS = 3;
const WAITING = 4;

/**
 * @param props.setToken used for setting token received at login 
 * @param props.setUserId used for setting user id received at login 
 * @returns page for logging in user. Use it so it doesn't show after login succeeded. 
 */
const ActuallyLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(NOT_LOGGED_IN);

    const accessHelper = accessHelp();

    const redirect = () => {
        window.location.href = pagesHelp().getURL(pagesHelp().pages.nearMe);
    }

    const loginUser = async() => {
        setLoginStatus(WAITING);

        console.log("frontend logging in user: " + username + ", " + password);

        axios.post("http://localhost:3001/verify-user", {
            userName: username, 
            password: password 
        }).then((response) => {
            console.log("verified, response = " + JSON.stringify(response));
            if (response.status == 200) {
                accessHelper.setUserId(response.data.verifiedUserId);
                accessHelper.setSongplacerToken(response.data.token);
                redirect();
            } else {
                console.log("verify user failed, response = " + JSON.stringify(response));
                setLoginStatus(FAIL);
            }           
        }).catch((err) => {
            setLoginStatus(FAIL);
            console.log("verify user error: " + err);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    }

    return(
        <div className="login-wrapper">
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Log in</button>
                </div>
            </form>
            {
                 loginStatus === WAITING ?
                        <h2>Logging in...</h2>
                    :
                        <></>
            }

            {
                
                loginStatus === FAIL ?
                        <h2>Login failed</h2>
                    :
                <></>
            }
            
        </div>
    )
}

export default ActuallyLogin;