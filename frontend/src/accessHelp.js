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
    const SPOTIFY_ACCESSTOKEN = 'spotify_access_token';
    const SPOTIFY_REFRESHTOKEN = 'spotify_refresh_token';
    const SPOTIFY_TOKEN_TIMEOUT = "spotify_token_ending_time";

    /**
     * Localstores timeoout = now + duration of validity for given item 
     */
    const setTimeOut = (item, validDuration) => {
        const now = new Date().getTime() / 1000; //now in seconds 
        const timeOut = now + validDuration;
        localStorage.setItem(item, timeOut);
    }


    /**
     * Authorizes Spotify user,
     * localstores users Spotify-id
     * localstores Spotify access-token
     * @param {*} code 
     * @returns 
     */
    const authorizeSpotify = (code) => {
        console.log("authorizing Spotify");
        return new Promise((res, rej) => {
            axios.post("http://localhost:3002/login", {
                code: code
            })
            .then((result) => {
                if (result.status != 200) {
                    console.log("spotify authorize error, response: " + JSON.stringify(res));
                    localStorage.clear(SPOTIFY_ACCESSTOKEN);
                    localStorage.clear(SPOTIFY_REFRESHTOKEN);
                    localStorage.clear(SPOTIFY_TOKEN_TIMEOUT);
                    rej();
                } else {
                    localStorage.setItem(SPOTIFY_ACCESSTOKEN, result.data.accessToken);
                    setTimeOut(SPOTIFY_TOKEN_TIMEOUT, result.data.expiresIn);                    
                    res(result.data.accessToken);
                }
            })
            .catch((err) => {
                rej(err);
            });
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
        })
        .catch((err) => console.log("could not localstore user Spotify-id"));
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

    /**
     * @returns the Spotify access token, refreshed if 
     * it would get invalid in lass than five minutes
     */
    const getSpotifyAccessToken = () => {
        const expirationTime = localStorage.getItem(SPOTIFY_TOKEN_TIMEOUT);        
        const nowInSeconds = new Date().getTime() / 1000;
        const inFiveMinutes = nowInSeconds + 5 * 60;


        const accessToken = localStorage.getItem(SPOTIFY_ACCESSTOKEN);

        if (!accessToken || accessToken == undefined) {
            console.log("no access token stored");
            return null;
        }

        console.log("expiration time: " + expirationTime);
        console.log("in five minutes: " + inFiveMinutes);
        

        //refresh access-token if it is invalid in less than five minutes
        if (true) {
            axios.post('http://localhost:3002/refresh')
            .then((res) => {
                setTimeOut(SPOTIFY_TOKEN_TIMEOUT, res.data.expiresIn);
                localStorage.setItem(SPOTIFY_ACCESSTOKEN, res.data.accessToken);
            })
            .catch((err) => {
                console.log("Could not refresh Spotify access token");
            });
        }

        return localStorage.getItem(SPOTIFY_ACCESSTOKEN);            
        
    }


    const getSongplacerToken = () => {
        return localStorage.getItem(SONGPLACER_TOKEN);
    }
    

    const logout = () => {    
        localStorage.clear();
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