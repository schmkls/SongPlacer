import MyPlaylists from "./library/MyPlaylists";
import PlaylistCreate from "./library/PlaylistCreate";
import Playlist from "./library/Playlist";
import SongPlaceCreate from "./library/SongplaceCreate";
import Logout from "./handleUser/Logout";
import NoPage from "./NoPage";

import { useState } from 'react';
import NearMe from "./nearMe/NearMe";


/**
   * Have routes and name of page that user should see. Pages with 1 or more '/'-signs will be will have a go-back-option
   * instead of open/close-navbar-option.   
   */
export default function usePages(){
    
    const pages = {
        library: {
            fullUrl: '/library',
            urlEnding: '/library', 
            name: 'My library',
            element: <MyPlaylists/>
        },
        addsongplace: {
            fullUrl: '/library/playlist-view/:playlistName/:playlistId/add-songplace',
            urlEnding: '/add-songplace', 
            name: 'Add a songplace', 
            element: <SongPlaceCreate/>
        }, 
        addplaylist: {
            fullUrl: '/library/create-playlist',  
            urlEnding: '/create-playlist', 
            name: 'Add a playlist', 
            element: <PlaylistCreate/>
        }, 
        specificplaylist: {
            fullUrl: '/library/playlist-view/:playlistName/:playlistId',
            urlEnding: '/playlist-view',
            name: 'Playlist', 
            element: <Playlist/>
        },
        logout: {
            fullUrl: '/handle-user/logout', 
            urlEnding: '/handle-user/logout', 
            name: 'Logout', 
            element: <Logout/>
        },
        nearme: {
            fullUrl: "/near-me", 
            urlEnding: "/near-me", 
            name: "Near me", 
            element: <NearMe/>
        },
        notfound: {
            fullUrl: '*', 
            urlEnding: '*', 
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