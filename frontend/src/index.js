import './index.css';

import {React} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./context"
import useToken from './useToken';
import Nav from './components/navigation/Nav';
import Login from './pages/handleUser/Login';
import usePages from './pages/usePages';


/**
 * Has the Document root and routes defining what should be rendered
 * for each route. 
 */
export default function App() {

  const { token, setToken } = useToken();

  //get object with pages info
  const pagesObj = usePages();
  const pages = pagesObj.pages;


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
        <BrowserRouter>
          <Nav pagesInfo={pages}/>
          <Routes>
              <Route path={pages.library.fullUrl} element={
                pages.library.element
              }/>

              <Route path={pages.addplaylist.fullUrl} element={
                pages.addplaylist.element
              }/>

              <Route path={pages.specificplaylist.fullUrl} element={
                pages.specificplaylist.element
              }/>

              <Route path={pages.addsongplace.fullUrl} element={
                pages.addsongplace.element
              }/>

              <Route path={pages.logout.fullUrl} element={
                pages.logout.element
              }/>

              <Route path={pages.nearme.fullUrl} element={
                pages.nearme.element
              }/>

              <Route path={pages.searchUser.fullUrl} element={
                pages.searchUser.element
              }/>

              <Route path={pages.notfound.fullUrl} element={
                pages.notfound.element
              }/>
              
          </Routes>
        </BrowserRouter> 
      </UserContext.Provider>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
);