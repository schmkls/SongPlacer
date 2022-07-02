import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './pagesHelp'
import Axios from 'axios';



const NoPage = () => {


    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <p>nå länk gå tillbaka</p>
        </div>
    );
}

export default NoPage;