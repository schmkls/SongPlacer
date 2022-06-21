import Library from "./library/Library";
import PlaylistCreate from "./library/PlaylistCreate";
import Playlist from "./library/Playlist";
import SongPlaceCreate from "./library/SongplaceCreate";
import Logout from "./handleUser/Logout";
import SearchUser from "./explore/SearchUser";
import NoPage from "./NoPage";
import Nav from "../components/navigation/Nav";

import { useState } from 'react';
import NearMe from "./explore/NearMe";


/**
   * Have routes and name of page that user should see. Pages with 1 or more '/'-signs will be will have a go-back-option
   * instead of open/close-navbar-option.   
   */
export default function usePages(){
    
    const pages = {
        navbar: {
            fullUrl: 'all',
            element: <Nav/>
        },
        myLibrary: {
            fullUrl: new URL('http://localhost:3000/library'),
            name: 'My library',
            element: <Library/>
        },
        library: {
            fullUrl: new URL('http://localhost:3000/library'),
            name: 'Library of some user wihu',
            element: <Library/>
        },
        addsongplace: {
            fullUrl: new URL('http://localhost:3000/library/add-songplace'),
            name: 'Add a songplace', 
            element: <SongPlaceCreate/>
        }, 
        addplaylist: {
            fullUrl: new URL('http://localhost:3000/library/add-playlist'),  
            urlEnding: '/create-playlist', 
            name: 'Add a playlist', 
            element: <PlaylistCreate/>
        }, 
        specificplaylist: {
            fullUrl: new URL('http://localhost:3000/library/playlist-view'),
            name: 'Playlist', 
            element: <Playlist/>
        },
        logout: {
            fullUrl: new URL('http://localhost:3000/logout-user'), 
            name: 'Logout', 
            element: <Logout/>
        },
        nearme: {
            fullUrl: new URL("http://localhost:3000/near-me"), 
            name: "Near me", 
            element: <NearMe/>
        },
        searchUser: {
            fullUrl: new URL("http://localhost:3000/search-user"), 
            name: "Search for user", 
            element: <SearchUser/>
        },
        notfound: {
            name: 'Page not found', 
            element: <NoPage/>
        }
    }

    const getEnding = (page) => {
        return window.location.href;
    }

    return {
        pages, 
        getEnding
    }
}