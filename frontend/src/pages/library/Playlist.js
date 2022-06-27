import React, { useEffect, useContext, useState} from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import '../../globals/Globals.css';
import './Library.css';
import { UserContext } from '../../context';
import usePages from '../usePages';
import ListedSongPlace from '../../components/common/ListedSongplace';
import EditPlaylist from '../../components/common/EditPlaylist';

const Playlist = () => {

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;
    
    const context = useContext(UserContext);
    const userId = context.userId;

    const currUrl = new URL(window.location.href);
    const playlistId = currUrl.searchParams.get('playlist-id');
    console.log('pl id: ' + playlistId);


    const [songplaces, setSongplaces] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [plName, setPlaylistName] = useState('spellistenamn wihu');
    const [showEdit, setShowEdit] = useState(false);

    const [isOwned, setIsOwned] = useState(false);

   
    const getSongPlaces = () => {
        //notice backticks ` 
        const getUrl = `http://localhost:3001/library/${userId}/${playlistId}/songplaces`; 

        Axios.get(getUrl)
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
        const deleteUrl = `http://localhost:3001/library/${userId}/delete-playlist/${playlistId}`; 

        Axios.delete(deleteUrl).then((response) => {
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
        let url = pagesHelp.getURL(pages.addsongplace);
        url.searchParams.set('playlist-id', playlistId);
        url.searchParams.set('playlist-name', plName);
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
     * Sets playlist name
     */
     useEffect(()=> {
        Axios.get(`http://localhost:3001/get-playlist/${playlistId}`).then((response) => {
            if (response.status == 200) {
                console.log("get name data: " + JSON.stringify(response.data[0].name));
                setPlaylistName(response.data[0].name)
            } else {
                console.log("get playlist name error: ");
            }
        }).catch((err) => console.log("get playlist name error: " + err));
    }, []);

    /**
     * Sets isOwned to true if user owns playlist
     */
     useEffect(()=> {
        getSongPlaces();
    }, []);

  
    

    /**
     * Check if user owns playlist and sets variable 'isOwned'
     */
     useEffect(() => {
        Axios.post('http://localhost:3001/verify-playlist-ownership', {
            playlistId: playlistId, 
            userId: userId
        }).then((response) => {
            if (response.status != 200) {
                console.log('Could not verify playlist ownership');
                setIsOwned(false);
            }
            setIsOwned(response.data.ownership);
        }).catch((err) => {
            console.log('Could not verify playlist ownership');
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
            
            <a href={getAddClickLocation()}>  
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