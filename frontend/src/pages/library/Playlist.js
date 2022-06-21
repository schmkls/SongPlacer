import React, { useEffect, useContext, useState} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '../../globals/Globals.css';
import './Library.css';
import { UserContext } from "../../context";
import usePages from '../usePages';
import ListedSongPlace from '../../components/common/ListedSongplace';
import { useParams } from 'react-router-dom';
import EditPlaylist from '../../components/common/EditPlaylist';

const Playlist = () => {

    const pagesObj = usePages();
    const pages = pagesObj.pages;
    
    const context = useContext(UserContext);
    const userId = context.userId;

    const { playlistName } = useParams();
    const { playlistId } = useParams();

    const [songplaces, setSongplaces] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [plName, setPlaylistName] = useState(playlistName);
    const [showEdit, setShowEdit] = useState(false);

    const [isOwned, setIsOwned] = useState(false);

   
    const getSongPlaces = () => {
        //notice backticks ` 
        const getUrl = `http://localhost:3001/library/${userId}/${playlistId}/songplaces`; 

        Axios.get(getUrl)
        .then((response) => {
            setSongplaces(response.data);
        }).catch((err) => {
            console.log("get songplaces error");
        });

    }

    const deleteSongplaces = (ids) => {

    }

    const deletePlaylistdetails = (ids) => {
        
    }

    /**
     * Deletes playlist (and songplaces in it). On success goes back to library. 
     */
    const deletePlaylist = () => {

        //notice backticks ` 
        const deleteUrl = `http://localhost:3001/library/${userId}/delete-playlist/${playlistId}`; 

        Axios.delete(deleteUrl).then((response) => {
            if (!response.status == 200) {
                console.log("playlist could not be deleted, status = " + response.status);
            } else {
                window.location.href = pages.library.fullUrl;
            }
        }).catch((err) => {
            console.log("playlist could not be deleted");
        });
    }
 
    const handleDeleteClick = () => {
        if (window.confirm("Delete playlist?")) {
            deletePlaylist();
        }
    }


    /**
     * Fetches songplaces in playlist after render
     */
    useEffect(()=> {
        getSongPlaces();
    }, []);

  
    /**
     * Might set loading to false (if data has been fetched), after render
     */
    useEffect(() => {
        if (songplaces !== null && songplaces !== undefined) {
            setLoading(false);
        }
    }, [songplaces]);

    /**
     * Check if user owns playlist and sets variable 'usersPlaylist'
     */
     useEffect(() => {
        Axios.post("http://localhost:3001/verify-playlist-ownership", {
            playlistId: playlistId, 
            userId: userId
        }).then((response) => {
            if (response.status != 200) {
                console.log("Could not verify playlist ownership");
                setIsOwned(false);
            }
            setIsOwned(response.data.ownership);
        }).catch((err) => {
            console.log("Could not verify playlist ownership");
            setIsOwned(false);
        }); 
    }, []);

    //todo: differentiate between no song-places and no data fetched
    return ( 
        <div className='library-outmost margin-top'>
            <h2>{plName}</h2>
            {
            isLoading ? 
                    <h2>Loading...</h2>
                :
                songplaces.map((songplace, index) => (
                    <ListedSongPlace songplace={songplace} key={index} playlistId={playlistId} isOwned={isOwned}></ListedSongPlace>
                ))
            }
            
            <a href={window.location.href + pages.addsongplace.urlEnding}>
            <FontAwesomeIcon icon={faCirclePlus} size='4x' className='icon add-button'/>
            </a>
            
            {
                isOwned ? 
                        <>
                            <button onClick={() => handleDeleteClick()}>Delete playlist</button>
                            <button onClick={() => setShowEdit(!showEdit)}>Edit playlist name</button>
                            <EditPlaylist show={showEdit} playlistId={playlistId} playlistName={plName} setPlaylistName={setPlaylistName}/>
                        </>
                    :
                        <></>

            }
            
        </div>
    );
}


export default Playlist;