import Library from './pages/library/library/Library';
import PlaylistCreate from './pages/library/playlistCreate/PlaylistCreate';
import Playlist from './pages/library/playlist/Playlist';
import SongPlaceCreateInPlaylist from './pages/library/songplaceCreateInPlaylist/SongplaceCreateInPlaylist';
import SearchUser from './pages/explore/searchUser/SearchUser';
import NoPage from './pages/noPage/NoPage';
import SideMenu from './components/nav/sideMenu/SideMenu';
import NearMe from './pages/explore/nearMe/NearMe';
import SpotifyAuth from './pages/handleUser/spotifyAuth/SpotifyAuth';
import Login from './pages/handleUser/login/Login';
import Logout from './pages/handleUser/logout/Logout';
import Explore from './pages/explore/explore/Explore';


/**
 * Knows urls and associated elements.
 * Has functionality to 
 *  get name (to display in navbar for example) for a route, 
 *  get URL for a route, 
 *  get elements associated with a route  
 *  
 * 
 */
export default function pagesHelp() {

    const urlBeginning = 'http://localhost:3000';

    const pages = {
        navbar: {
            path: 'all', //indicator to display element on all routes
            element: <SideMenu/>
        },
        library: {
            path: '/library',
            name: 'Library',
            element: <Library/>
        },
        explore: {
            path: '/explore',
            name: 'Explore',
            element: <Explore/>
        },
        searchedLibrary: {
            path: '/search/library',
            name: 'Search',
            element: <Library/>
        },
        addSongplace: {
            path: '/library/add-songplace',
            name: 'Add a songplace', 
            element: <SongPlaceCreateInPlaylist/>
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
        spotifyAuth: {
            path: '/authorize-spotify', 
            name: 'Authorize Spotify', 
            element: <SpotifyAuth/>
        },
        login: {
            path: '/login', 
            name: 'Login (optional)', 
            element: <Login/>
        },
        logout: {
            path: '/logout/confirm', 
            name: 'Logout', 
            element: <Logout/>
        },
        nearMe: {
            path: '/explore/near-me', 
            name: 'Near me', 
            element: <NearMe/>
        },
        searchUser: {
            path: '/explore/search-user', 
            name: 'Search', 
            element: <SearchUser/>
        },
        notFound: {
            name: 'Page not found', 
            element: <NoPage/>
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


    /**
     * @returns the elements that should be displayed for current location
     */
    const getElements = () => {
        const result = [];
 
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
            console.log("no elements found for: " + window.location.pathname);
            result.push(pages.notFound.element);
        }

        return result;
    }




    return {
        pages, 
        getURL, 
        getName, 
        getElements, 
    }
}