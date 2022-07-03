import './index.css';

import { React } from 'react';
import ReactDOM from 'react-dom/client';
import pagesHelp from './pagesHelp';
import SpotifyAuth from './pages/handleUser/spotifyAuth/SpotifyAuth';

/**
 * Has the Document root and routes defining what should be rendered
 * for each route. 
 */
export default function App() {

    const accessToken = localStorage.getItem("access_token");

    console.log("accessToken in localStorage: " + JSON.stringify(accessToken));
    
    if (!accessToken || accessToken === "undefined") {        
        return <SpotifyAuth/>
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