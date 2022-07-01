import './index.css';

import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import { UserContext } from "./context"
import useToken from './useToken';
import Login from './pages/handleUser/Login';
import usePages from './pages/usePages';


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

      if (!pages.hasOwnProperty(key))  {
        continue;
      }
      
      var page = pages[key];      

      // eslint-disable-next-line eqeqeq  
      if (window.location.pathname == page.path || page.path === 'all') {
        result.push(page.element);
      }
    }

    //if only one element was found for route (Nav is always found): display 'Not found'-page     
    if (result.length === 1) {
      result.push(pages.notfound.element);
    }

    return result;
  }

  useEffect(() => {
    setElements(getElements());
  }, []);


  /* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */
  if (!token) {
    return <Login setToken={setToken}></Login>
  } 

  const tokenLs = localStorage.getItem('token');
  const userToken = JSON.parse(tokenLs)?.token;
  const userId = userToken?.userId;

 
  return (
      <>
      <UserContext.Provider value={{userId: userId}}>
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