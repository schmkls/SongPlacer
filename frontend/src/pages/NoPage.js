import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './usePages'
import useSecrets from "../useSecrets";
import Axios from 'axios';


const AUTH_URL = ''

const NoPage = () => {

    var client_id = '00ec5f716a774d7ba0fd58833ec22323'; // Your client id
    var client_secret = 'a5544978b6314f4cab9efc731152862d'; // Your secret

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
        grant_type: 'client_credentials'
        },
        json: true
    };

    const getToken = () => {
        Axios.get().then(() => {

        }).catch((err) => {console.log(err)});
    }



    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
        </div>
    );
}

export default NoPage;