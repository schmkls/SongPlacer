
export default function accessHelp() {


    const userIsLoggedIn = () => {
        if (localStorage.getItem('user_id') === 'undefined' || !localStorage.getItem('user_id')) {
            return false;
        }

        return true;
    }

    const getCurrUserId = () => {
        return localStorage.getItem('user_id');
    }

    const isCurrUser = (id) => {
        return getCurrUserId() == id;
    }

    const getSpotifyAccessToken = () => {
        return localStorage.getItem('access_token');
    }


    return {
        userIsLoggedIn, 
        getCurrUserId, 
        isCurrUser, 
        getSpotifyAccessToken
    }
}