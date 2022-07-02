import { React, useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context";
import usePages from '../pagesHelp';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Globals from '../../globals/Globals.css';
import ListedPlaylist from '../../components/common/ListedPlaylist'

/**
 * @returns library of given owner
 */
const Library = () => {

    const userContext = useContext(UserContext);
    const currUser = userContext.userId;

    //owner of library
    const currUrl = new URL(window.location.href);
    const userId = currUrl.searchParams.get('user-id');

    const pagesHelp= usePages();
    const pages = pagesHelp.pages;

    const [username, setUsername] = useState();
    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const isOwned = (currUser == userId);


    /**
     * Fetches playlists after render 
     */
     useEffect(()=> {
        //notice backticks ` 
        const getURL = `http://localhost:3001/library/${userId}`;
        
        Axios.get(getURL).then((response) => {
            console.log("libr response: " + JSON.stringify(response.data));
            setPlaylists(response.data);
        }).catch((err) => console.log("get playlists error: " + err));
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
        Axios.get(`http://localhost:3001/get-username/${userId}`).then((response) => {
        setUsername(response.data[0].username);
        }).catch((err) => console.log("get username error: " + err))
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