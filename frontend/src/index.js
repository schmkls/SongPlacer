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

    const code = new URLSearchParams(window.location.search).get("code");
    const accessToken = localStorage.getItem("access_token");

    console.log("accessToken i localStorage: " + accessToken);
    
    if (!accessToken) {        
        return <Login/>
    }

    console.log("returning app, accessToken: " + accessToken);

    const pages = pagesHelp(accessToken);


    //todo: user = userId + username + spotify-account
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