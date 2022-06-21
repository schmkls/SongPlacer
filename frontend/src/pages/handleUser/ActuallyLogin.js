import {React, useState} from "react";
import Axios from 'axios';


const NOT_LOGGED_IN = 1;
const LOGIN_FAIL = 2;
const LOGIN_SUCCES = 3;

/**
 * @param props.setToken used for setting token received at login 
 * @param props.setUserId used for setting user id received at login 
 * @returns page for logging in user. Use it so it doesn't show after login succeeded. 
 */
const ActuallyLogin = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState(NOT_LOGGED_IN);

    const loginUser = async() => {
        console.log("frontend logging in user: " + username + ", " + password);

        Axios.post("http://localhost:3001/verify-user", {
            userName: username, 
            password: password 
        }).then((response) => {
            if (response.status == 200) {
                props.setToken({token: response.data});
                setLoginStatus(LOGIN_SUCCES);
            } else {
                setLoginStatus(LOGIN_FAIL);
            }           
        }).catch((err) => {
            setLoginStatus(LOGIN_FAIL);
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
                
                loginStatus === LOGIN_FAIL ?
                        <h2>Login failed</h2>
                    :
                <></>
            }
            
        </div>
    )
}

export default ActuallyLogin;