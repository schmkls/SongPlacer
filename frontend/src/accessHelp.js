import axios from 'axios';

/**
 * Helps with access stuff such as checking localstored data 
 * about current user. 
 */
export default function accessHelp() {

    //the variables in localstorage
    const SONGPLACER_ID = 'user_id';
    const SONGPLACER_TOKEN = 'songplacer_token';
    const SPOTIFY_USER_ID = "spotify_user_id"
    const SPOTIFY_ACCESSTOKEN = 'access_token';
    const SPOTIFY_AUTH_CODE = "spotify_auth_code";


   

    /**
     * Authorizes Spotify user,
     * localstores users Spotify-id
     * localstores Spotify access-token
     * @param {*} code 
     * @returns 
     */
    const authorizeSpotify = (code) => {
        localStorage.setItem(SPOTIFY_AUTH_CODE, code);

        return new Promise((res, rej) => {
            axios.post("http://localhost:3002/login", {
                code: code
            })
            .then((result) => {
                if (result.status != 200) {
                    console.log("spotify authorize error, response: " + JSON.stringify(res));
                    localStorage.clear(SPOTIFY_AUTH_CODE);
                    localStorage.clear(SPOTIFY_ACCESSTOKEN);
                    rej();
                } else {
                    localStorage.setItem(SPOTIFY_ACCESSTOKEN, result.data.accessToken);
                    res(result.data.accessToken);
                }
            })
            .catch((err) => {
                rej(err);
            })
        });
    }

     /**
     * @param accessToken Spotify access token 
     * @returns users Spotify-id
     */
      const storeUserSpotifyId = (accessToken) => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
        }).then((response) => {
            localStorage.setItem(SPOTIFY_USER_ID, response.data.id);
        });
    }   


    const getCurrSpotifyUser = () => {
        return localStorage.getItem(SPOTIFY_USER_ID);
    }

    const setSongplacerToken = (token) => {
        localStorage.setItem(SONGPLACER_TOKEN, token);
        console.log("accessHelp set user token: " + localStorage.getItem(SONGPLACER_TOKEN));

    }

    const setUserId = (id) => {
        localStorage.setItem(SONGPLACER_ID, id);
        console.log("accessHelp set user id: " + localStorage.getItem(SONGPLACER_ID));
    }

    const getCurrUserId = () => {
        return localStorage.getItem(SONGPLACER_ID);
    }

    //maybe in future some kind of system to check server for temporary generated token
    const userIsLoggedIn = () => {
        if (localStorage.getItem(SONGPLACER_TOKEN) === 'undefined' || !localStorage.getItem(SONGPLACER_TOKEN)) {
            return false;
        }

        return true;
    }

    const isCurrUser = (id) => {
        return getCurrUserId() == id;
    }

    const getSpotifyAccessToken = () => {
        return localStorage.getItem(SPOTIFY_ACCESSTOKEN);            
    }

    const getSongplacerToken = () => {
        return localStorage.getItem(SONGPLACER_TOKEN);
    }

    const logout = () => {    
        localStorage.removeItem(SONGPLACER_ID);
        localStorage.removeItem(SONGPLACER_TOKEN);
        localStorage.removeItem(SPOTIFY_ACCESSTOKEN); //todo: remove when accesToken auto refreshes
    }


    return {
        authorizeSpotify, 
        storeUserSpotifyId,
        getSpotifyAccessToken, 
        getCurrSpotifyUser, 
        setSongplacerToken, 
        setUserId,
        userIsLoggedIn, 
        getCurrUserId, 
        isCurrUser, 
        getSongplacerToken, 
        logout
    }
}  