import './index.css';

import { React, useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { UserContext } from "./context"
import useToken from './useToken';
import usePages from './pages/usePages';
import Login from './pages/handleUser/Login';
import { Axios } from 'axios';

/**
 * Has the Document root and routes defining what should be rendered
 * for each route. 
 */
export default function App() {

    //get object with pages info
    const pagesObj = usePages();
    const pages = pagesObj.pages;


    const { token, setToken } = useToken();
    const [elements, setElements] = useState([]);


    const getElements = () => {
        const result = [];
        console.log("getting elements");

        for (var key in pages) {
            if (!pages.hasOwnProperty(key)) {
                continue;
            }
            var page = pages[key];

            // eslint-disable-next-line eqeqeq  
            if (window.location.pathname == page.path || page.path === 'all') {
                result.push(page.element);
            }
        }

        if (result.length === 1) { //Nav is always found
            result.push(pages.notfound.element);
        }

        return result;
    }


    useEffect(() => {
        setElements(getElements());
    }, []);


    //
    const code = new URLSearchParams(window.location.search).get("code");
    if (!code) {
        return <Login/>
    }


    //todo: user = userId + username + spotify-account
    return (
        <>
            <UserContext.Provider value={{ userId: 32 }}>
                {
                    elements.map((elem, index) => (
                        <div key={index}>
                            {elem}
                        </div>
                    ))
                }

            </UserContext.Provider>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
);