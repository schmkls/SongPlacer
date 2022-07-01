import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './usePages'
import Axios from 'axios';


const NoPage = () => {

  
    const getToken = () => {
     
    }



    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <button onClick={() => getToken()}> Authorize </button>
        </div>
    );
}

export default NoPage;