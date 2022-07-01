import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './usePages'
import Axios from 'axios';


const NoPage = () => {

  
    const getToken = () => {
        Axios.get('http://localhost:3002/login')
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