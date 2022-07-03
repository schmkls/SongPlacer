import { React, useState, useEffect } from 'react';
import pagesHelp from '../../../pagesHelp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Globals from '../../../globals/Globals.css';
import ListedPlaylist from '../../../components/common/ListedPlaylist/ListedPlaylist'
import axios from 'axios';

/**
 * @returns library of given owner
 */
const Library = () => {

    const access_token = localStorage.getItem('access_token');
    const currUser = localStorage.getItem('user_id');
    console.log("library sees current user-id: " + currUser);


    //owner of library
    const userId = new URL(window.location.href).searchParams.get('user-id');

    const pageHelper = pagesHelp();
    const pages = pagesHelp.pages;

    const [username, setUsername] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const isOwned = (currUser == userId);


    /**
     * Fetches playlists after render 
     */
     useEffect(()=> {
       
    }, []);

    /**
     * Might set loading to false (if data has been fetched), after render
     */
    useEffect(() => {
        if (playlists !== null && playlists !== undefined) {
        setLoading(false);
    }
    }, [playlists]);


    /**
     * Sets username
     */
     useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + access_token,
            }
        }).then((response) => {
            console.log("get user info response: " + JSON.stringify(response));
            setUsername(response.data.display_name);
        }).catch((err) => console.log("get user info error: " + err)); 
    }, []);


    const getUserInfo = () => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + access_token,
            }
        }).then((response) => {
            console.log("get user info response: " + JSON.stringify(response));
        }).catch((err) => console.log("get user info error: " + err));
    }

    return (
        <div className='library-outmost margin-top'>
            <h4>{username}'s library</h4>
            {console.log("returning my library")}
            <button onClick={() => getUserInfo()}>Get user info</button>
            {
                isLoading ? 
                        <h2>Loading...</h2>
                    :   
                        playlists.map((playlist, index) => (
                            <ListedPlaylist playlist={playlist} key={index}></ListedPlaylist>
                        ))
            }
     
            {
                isOwned ? 
                    <a href={pagesHelp.getURL(pages.addplaylist)}>
                        <FontAwesomeIcon icon={faCirclePlus} size='4x' className='icon add-button'/>
                    </a>
                :
                    <></>
            }
        </div>
    );

}

export default Library;