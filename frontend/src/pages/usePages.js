import Library from './library/Library';
import PlaylistCreate from './library/PlaylistCreate';
import Playlist from './library/Playlist';
import SongPlaceCreate from './library/SongplaceCreate';
import Logout from './handleUser/Logout';
import SearchUser from './explore/SearchUser';
import NoPage from './NoPage';
import Nav from '../components/navigation/Nav';
import LoginCallback from './handleUser/LoginCallback';
import NearMe from './explore/NearMe';
import CreateUser from './handleUser/CreateUser';

/**
 * Knows urls and associated elements.
 * Has functionality to get name (to display in navbar for example) for a route, 
 * URL or URLSearchParams for route.  
 *  
 */
export default function usePages() {

    const urlBeginning = 'http://localhost:3000';

    const pages = {
        navbar: {
            path: 'all', //indicator to display element on all routes
            element: <Nav/>
        },
        library: {
            path: '/library',
            name: 'Library',
            element: <Library/>
        },
        searchedLibrary: {
            path: '/search/library',
            name: 'Search',
            element: <Library/>
        },
        addsongplace: {
            path: '/library/add-songplace',
            name: 'Add a songplace', 
            element: <SongPlaceCreate/>
        }, 
        addplaylist: {
            path: '/library/add-playlist',  
            name: 'Add a playlist', 
            element: <PlaylistCreate/>
        }, 
        playlist: {
            path: '/library/playlist',
            name: 'Library', 
            element: <Playlist/>
        },
        searchedPlaylist: {
            path: '/search/playlist',
            name: 'Search', 
            element: <Playlist/>
        },
        logout: {
            path: '/logout-user', 
            name: 'Logout', 
            element: <Logout/>
        },
        nearme: {
            path: '/near-me', 
            name: 'Near me', 
            element: <NearMe/>
        },
        searchUser: {
            path: '/search-user', 
            name: 'Search', 
            element: <SearchUser/>
        },
        notfound: {
            name: 'Page not found', 
            element: <NoPage/>
        }, 
        spotifyLoginCallback: {
            path: '/login-callback',
            name: 'Spotify login status',
            element: <LoginCallback/>
        }, 
        createUser: {
            path: '/create-user',
            name: 'Create user',
            element: <CreateUser/>
        }, 
        authorize: {
            path: 'https://accounts.spotify.com/en/authorize?client_id=00ec5f716a774d7ba0fd58833ec22323&response_type=code&redirect_uri=http://localhost:3000/login-callback&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state'
        }
    }

    /** 
     * @param page amongst the pages
     * @returns url associated to page
     */
    const getURL = (page) => {
        return new URL(urlBeginning + page.path);
    }


    /**
     * Return name for current location
     * 
     * @param pathName last part of location, like for example: '/library' 
     */
    const getName = (pathName) => {
        for (var key in pages) {
            if (pages[key].path === pathName) {
                return pages[key].name;
            }
        }

        console.log("could not associated name for path: " + pathName);
    }

    return {
        pages, 
        getURL, 
        getName
    }
}