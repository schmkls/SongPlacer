import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '../../../globals/Globals.css';
import '../Library.css'
import ListedSongPlace from '../../../components/common/listedSongplace/ListedSongplace';
import EditPlaylist from '../../../components/common/editPlaylist/EditPlaylist';
import pagesHelp from '../../../pagesHelp';
import accessHelp from '../../../accessHelp';



const Playlist = () => {

    const pagesHelper = pagesHelp();
    const pages = pagesHelper.pages;

    const accessHelper = accessHelp();
    
    const currUser = accessHelper.getCurrUserId();

    const currUrl = new URL(window.location.href);
    const playlistId = currUrl.searchParams.get('playlist-id');


    const [songplaces, setSongplaces] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [plName, setPlaylistName] = useState();
    const [showEdit, setShowEdit] = useState(false);

    const [isOwned, setIsOwned] = useState(false);

   
    const getSongPlaces = () => {
        //notice backticks ` 
        const getUrl = `http://localhost:3001/v1/library/${currUser}/${playlistId}/songplaces`; 

        axios.get(getUrl)
        .then((response) => {
            setSongplaces(response.data);
        }).catch((err) => {
            console.log('get songplaces error');
        });

    }

    /**
     * Deletes playlist (and songplaces in it). On success goes back to library. 
     */
    const deletePlaylist = () => {
        //notice backticks ` 
        const deleteUrl = `http://localhost:3001/v1/library/${currUser}/delete-playlist/${playlistId}`; 

        axios.delete(deleteUrl).then((response) => {
            if (!response.status == 200) {
                console.log('playlist could not be deleted, status = ' + response.status);
            } else {
                window.history.go(-1);
            }
        }).catch((err) => {
            console.log('playlist could not be deleted');
        });
    }
 
    const handleDeleteClick = () => {
        if (window.confirm('Delete playlist?')) {
            deletePlaylist();
        }
    }

    const getAddClickLocation = () => {
        let url = pagesHelper.getURL(pages.addSongplace);
        url.searchParams.set('playlist-id', playlistId);
        return url;
    }


    /**
     * Sets loading to false if data has been fetched
     */
     useEffect(() => {
        if (songplaces !== null && songplaces !== undefined) {
            setLoading(false);
        }
    }, [songplaces]);


    /**
     * Fetches songplaces in playlist after render
     */
    useEffect(()=> {
        getSongPlaces();
    }, []);


    /**
     * Sets playlist name and if playlist is owned
     */
     useEffect(()=> {
        axios.get(`http://localhost:3001/v1/get-playlist/${playlistId}`).then((response) => {
            if (response.status == 200) {
                setPlaylistName(response.data[0].name);
                setIsOwned(response.data[0].user_id == currUser);
            } else {
                console.log("get playlist name error: ");
            }
        }).catch((err) => console.log("get playlist name error: " + err));
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
                    <ListedSongPlace id={songplace.id} trackId={songplace.track_id} playlistId={playlistId} isOwned={isOwned} key={index}/>
                ))
            }
            {
                isOwned ? 
                        <>
                             <a href={getAddClickLocation()}>  
                                <FontAwesomeIcon icon={faCirclePlus} size='4x' className='icon add-button'/>
                            </a>
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