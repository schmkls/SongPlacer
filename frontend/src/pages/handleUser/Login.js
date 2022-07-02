import {React} from "react";
import pagesHelp from "../pagesHelp";
import axios from 'axios';
import useAuth from "../../useAuth";


/**
 * @returns page with alternative to login and create new user
 */
const Login = (props) => {

    const pages = pagesHelp();

    //where to direct after login 
    const redirectUrl = pages.getURL(pages.pages.login);

    const AUTH_URL = `https://accounts.spotify.com/en/authorize?client_id=00ec5f716a774d7ba0fd58833ec22323&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state`;

    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = useAuth(code);
    localStorage.setItem("access_token", accessToken);

    /**
     * @returns current users spotify id 
     */
    const getUserId = async() => {
        return new Promise((res, rej) => {
            axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
            }).then((response) => {
                res(response.data.id);
            }).catch((err) => {
                rej(err);
            });

        })
    }

    //store user id and redirect if access token has been retrieved
    if (accessToken) {
        getUserId()
        .then(
            (userId) => localStorage.setItem('user_id', userId),
            (err) => console.log("get user id error: " + err)
        );
        
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