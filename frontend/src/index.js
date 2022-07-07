import './index.css';

import { React } from 'react';
import ReactDOM from 'react-dom/client';
import pagesHelp from './pagesHelp';
import SpotifyAuth from './pages/handleUser/spotifyAuth/SpotifyAuth';
import accessHelp from './accessHelp';

/**
 * Has the Document root and routes defining what should be rendered
 * for each route. 
 */
export default function App() {

    const pagesHelper = pagesHelp();
    const accessHelper = accessHelp();
    const accessToken = localStorage.getItem('spotify_access_token');

    console.log("index sees accessToken: " + accessToken);
    
    //if Spotify not authorized: return page to authorize Spotify and receive accessToken
    if (!accessToken || accessToken === "undefined") {        
        return <SpotifyAuth/>
    }


    return (
        <>
            {
                pagesHelper.getElements().map((elem, index) => (
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