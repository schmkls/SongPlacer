import React from "react";
import Globals from '../../globals/Globals.css';
import pagesHelp from '../../pagesHelp';



const NoPage = () => {

    const pagesHelper = pagesHelp();

    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <button onClick={() => window.history.go(-1)}>Go back</button>
        </div>
    );
}

export default NoPage;