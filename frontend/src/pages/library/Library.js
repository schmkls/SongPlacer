import { React, useState, useEffect, useContext } from 'react';
import { UserContext } from "../../context";
import usePages from '../usePages';
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
    const userId = userContext.userId;

    const pagesObj = usePages();
    const pages = pagesObj.pages;

    const [playlists, setPlaylists] = useState([]);
    const [isLoading, setLoading] = useState(true);

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

    return (
        <div className='library-outmost margin-top'>
            {console.log("returning my library")}
            {
                isLoading ? 
                        <h2>Loading...</h2>
                    :   
                        playlists.map((playlist, index) => (
                            <ListedPlaylist playlist={playlist} key={index}></ListedPlaylist>
                        ))
            }
     
                
            <a href={window.location.href + pages.addplaylist.urlEnding}>
                <FontAwesomeIcon icon={faCirclePlus} size='4x' className='icon add-button'/>
            </a>
              
            
        </div>
    );

}

export default Library;