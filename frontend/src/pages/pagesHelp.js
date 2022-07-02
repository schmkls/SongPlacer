import Library from './library/Library';
import PlaylistCreate from './library/PlaylistCreate';
import Playlist from './library/Playlist';
import SongPlaceCreate from './library/SongplaceCreate';
import Logout from './handleUser/Logout';
import SearchUser from './explore/SearchUser';
import NoPage from './NoPage';
import Nav from '../components/navigation/Nav';
import NearMe from './explore/NearMe';
import Login from './handleUser/Login';
import useAuth from '../useAuth';


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
        addSongplace: {
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
        login: {
            path: '/login', 
            name: 'Login', 
            element: <Login/>
        },
        logout: {
            path: '/logout-user', 
            name: 'Logout', 
            element: <Logout/>
        },
        nearMe: {
            path: '/near-me', 
            name: 'Near me', 
            element: <NearMe/>
        },
        searchUser: {
            path: '/search-user', 
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
            result.push(pages.notfound.element);
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