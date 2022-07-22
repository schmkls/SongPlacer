import { React, useState, useEffect } from 'react';
import pagesHelp from '../../../pagesHelp';
import accessHelp from '../../../accessHelp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Globals from '../../../globals/Globals.css';
import ListedPlaylist from '../../../components/common/listedPlaylist/ListedPlaylist'
import axios from 'axios';

/**
 * @returns library of given owner
 */
const Library = () => {

    //owner of library
    const userId = new URL(window.location.href).searchParams.get('user-id');

    const pageHelper = pagesHelp();
    const pages = pageHelper.pages;

    const accessHelper = accessHelp();

    const [username, setUsername] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const isOwned = (accessHelper.getCurrUserId() == userId); 


    /**
     * Fetches playlists after render 
     */
     useEffect(()=> {
        axios.get(`http://localhost:3001/v1/library/${userId}`).then((response) => {
            if (response.status == 200) {
                setPlaylists(response.data)
            } else {
                console.log("could not get playlists")
            }
        }).catch((err) => {
            console.log("could not get playlists");
        })
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
        //todo: get by user id
        axios.get(`http://localhost:3001/v1/get-username/${userId}`)
        .then((response) => {
            console.log("get-username response: " + JSON.stringify(response));
            if (response.status == 200) {
                setUsername(response.data[0].username)
            } else {
                console.log("could not get username")
                setUsername('-');
            }
        }).catch((err) => {
            console.log("could not get username");
            setUsername('-');
        })
    }, []);


    return (
        <div className='library-outmost margin-top'>
            <h4>{username}'s library</h4>
            {console.log("returning my library")}
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
                    <a href={pageHelper.getURL(pages.addplaylist)}>
                        <FontAwesomeIcon icon={faCirclePlus} size='4x' className='icon add-button'/>
                    </a>
                :
                    <></>
            }
        </div>
    );

}

export default Library;