import React from "react";
import Globals from '../globals/Globals.css';
import usePages from './usePages'

const NoPage = () => {

    const pagesObj = usePages();
    const pages = pagesObj.pages;

    return (
        <div className='margin-top'>
            <h2>Not a page</h2>
            <a href={pages.library.fullUrl}>Go home</a>
        </div>
    );
}

export default NoPage;