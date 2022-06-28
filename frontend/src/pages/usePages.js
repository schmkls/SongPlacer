import Library from './library/Library';
import PlaylistCreate from './library/PlaylistCreate';
import Playlist from './library/Playlist';
import SongPlaceCreate from './library/SongplaceCreate';
import Logout from './handleUser/Logout';
import SearchUser from './explore/SearchUser';
import NoPage from './NoPage';
import Nav from '../components/navigation/Nav';

import { useState } from 'react';
import NearMe from './explore/NearMe';


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
            path: 'all',
            element: <Nav/>
        },
        library: {
            path: '/library',
            name: 'Library',
            element: <Library/>
        },
        otherUserLibrary: {
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
        specificplaylist: {
            path: '/playlist',
            name: 'Library', 
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
            name: 'Search for user', 
            element: <SearchUser/>
        },
        notfound: {
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

    return {
        pages, 
        getURL, 
        getName
    }
}