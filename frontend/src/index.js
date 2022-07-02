import './index.css';

import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import pagesHelp from './pages/pagesHelp';
import Login from './pages/handleUser/Login';
import useAuth from './useAuth';
/**
 * Has the Document root and routes defining what should be rendered
 * for each route. 
 */
export default function App() {

    const accessToken = localStorage.getItem("access_token");

    console.log("accessToken in localStorage: " + accessToken);
    
    if (!accessToken) {        
        return <Login/>
    }

    const pages = pagesHelp();

    return (
        <>
                {
                    pages.getElements().map((elem, index) => (
                        <div key={index}>
                            {elem}
                        </div>
                    ))
                }
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
);