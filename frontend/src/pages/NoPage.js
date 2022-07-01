import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './usePages'
import Axios from 'axios';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=00ec5f716a774d7ba0fd58833ec22323&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state";

const NoPage = () => {

    const code = new URLSearchParams(window.location.search).get('code');

    console.log("code: " + code);

    const getToken = () => {
        Axios.post('http://localhost:3002/login')
        .then((response) => console.log("login response: " + JSON.stringify(response)))
        .catch((err) => console.log("error: " + err));
    }



    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <button onClick={() => getToken()}> Authorize </button>
        </div>
    );
}

export default NoPage;