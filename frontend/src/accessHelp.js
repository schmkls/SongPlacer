
export default function accessHelp() {

    //the variables in localstorage
    const SONGPLACER_ID_STR = 'user_id';
    const SONGPLACER_TOKEN_STR = 'token';
    const SPOTIFY_ACCESSTOKEN_STR = 'access_token';

    const setSongplacerToken = (token) => {
        localStorage.setItem(SONGPLACER_TOKEN_STR, token);
        console.log("accessHelp set user token: " + localStorage.getItem(SONGPLACER_TOKEN_STR));

    }

    const setUserId = (id) => {
        localStorage.setItem(SONGPLACER_ID_STR, id);
        console.log("accessHelp set user id: " + localStorage.getItem(SONGPLACER_ID_STR));
    }

    const getCurrUserId = () => {
        console.log("accessHelper says currUserId = " + localStorage.getItem(SONGPLACER_ID_STR));
        return localStorage.getItem(SONGPLACER_ID_STR);
    }

    //maybe in future some kind of system to check server for temporary generated token
    const userIsLoggedIn = () => {
        console.log("accessHelp sees user token is: " + getCurrUserId());
        if (localStorage.getItem(SONGPLACER_TOKEN_STR) === 'undefined' || !localStorage.getItem(SONGPLACER_TOKEN_STR)) {
            return false;
        }

        return true;
    }

    const isCurrUser = (id) => {
        return getCurrUserId() == id;
    }

    const getSpotifyAccessToken = () => {
        return localStorage.getItem(SPOTIFY_ACCESSTOKEN_STR);
    }

    const getSongplacerToken = () => {
        return localStorage.getItem(SONGPLACER_TOKEN_STR);
    }

    const logout = () => {    
        localStorage.removeItem(SONGPLACER_ID_STR);
        localStorage.removeItem(SONGPLACER_TOKEN_STR);
    }


    return {
        setSongplacerToken, 
        setUserId,
        userIsLoggedIn, 
        getCurrUserId, 
        isCurrUser, 
        getSpotifyAccessToken, 
        getSongplacerToken, 
        logout
    }
}  