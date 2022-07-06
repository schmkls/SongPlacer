import React from "react";
import Globals from '../../globals/Globals.css';
import pagesHelp from '../../pagesHelp';



const NoPage = () => {

    const pagesHelper = pagesHelp();

    const goHome = () => {
        window.location.href = pagesHelper.getURL(pagesHelper.pages.explore);
    }
        
    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <button onClick={() => goHome()}>Go home</button>
        </div>
    );
}

export default NoPage;