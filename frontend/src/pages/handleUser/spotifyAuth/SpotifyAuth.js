import {React, useState} from "react";
import pagesHelp from "../../../pagesHelp";
import axios from 'axios';
import accessHelp from "../../../accessHelp";


/**
 * @returns page with alternative to login and create new user
 */
const SpotifyAuth = (props) => {

    const pagesHelper = pagesHelp();
    const accessHelper = accessHelp();

    //where to direct after login 
    const redirectUrl = pagesHelper.getURL(pagesHelper.pages.login);

    const AUTH_URL = `https://accounts.spotify.com/en/authorize?client_id=00ec5f716a774d7ba0fd58833ec22323&response_type=code&redirect_uri=${redirectUrl}&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state`;

    const code = new URLSearchParams(window.location.search).get("code");

    if (code && code !== 'undefined') {
        accessHelper.authorizeSpotify(code)
        .then((accessToken) => {
            accessHelper.storeUserSpotifyId(accessToken);
            //navigate to login page
            window.location.href = pagesHelper.getURL(pagesHelper.pages.login);
        })
        .catch((err) => console.log("authorizeError: " + err));
    }

    return (
        
        <div>

            {
                console.log("code when returning: " + code)
            }
            <h2>Welcome to SongPlacer!</h2>
            <h6>(use at own risk)</h6>
            <hr/>
            <h6>Connect with your Spotify to begin exploring songs through places!</h6>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type='button' className='btn btn-secondary' onClick={() => window.location.href = AUTH_URL}>Connect with Spotify</button>
            </div>
        </div>
    )
}

export default SpotifyAuth;