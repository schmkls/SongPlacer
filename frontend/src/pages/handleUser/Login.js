import {React, useState} from "react";
import pagesHelp from "../pagesHelp";
import axios from 'axios';
import CreateUser from "./CreateUser";
import useAuth from "../../useAuth";


/**
 * @returns page with alternative to login and create new user
 */
const Login = (props) => {

    const pages = pagesHelp();

    //where to direct after login 
    const redirectUrl = pages.getURL(pages.pages.login);

    const AUTH_URL = `https://accounts.spotify.com/en/authorize?client_id=00ec5f716a774d7ba0fd58833ec22323&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state`;
    
    const login = (code) => {
        if (!code)  return;
        console.log("logging in with code: " + code);
        axios
            .post("http://localhost:3002/login", {
                code,
            })
            .then(res => {
                localStorage.setItem("access_token", res.data.accessToken);
            })
            .catch((err) => {
                console.log("login error: " + err);
            })
    }

    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = useAuth(code);
    localStorage.setItem("access_token", accessToken);

    if (accessToken) {
        window.location.href = pages.getURL(pages.pages.nearMe);
    }

    return (
        
        <div>
            <h2>Welcome to SongPlacer!</h2>
            <h6>(use at own risk)</h6>
            <hr/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type='button' className='btn btn-secondary' onClick={() => window.location.href = AUTH_URL}>Login</button>
            </div>
        </div>
    )
}

export default Login;