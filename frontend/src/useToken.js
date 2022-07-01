import { useState } from 'react';

/**
 * Inspired by:
 * https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
 * 
 * @returns a token and a method for saving token
 */
export default function useToken() {

  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}