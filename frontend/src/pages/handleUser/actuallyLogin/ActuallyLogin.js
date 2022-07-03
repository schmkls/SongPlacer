import {React, useState} from "react";
import axios from 'axios';
import pagesHelp from "../../../pagesHelp";


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


    const redirect = () => {
        window.location.href = pagesHelp().getURL(pagesHelp().pages.nearMe);
    }

    const loginUser = async() => {
        console.log("frontend logging in user: " + username + ", " + password);

        axios.post("http://localhost:3001/verify-user", {
            userName: username, 
            password: password 
        }).then((response) => {
            if (response.status == 200) {
                console.log("setting userId to: " + response.data.userId);
                localStorage.setItem('user_id', response.data.userId);
                localStorage.setItem('songplacer_token', response.data.token);
                redirect();
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