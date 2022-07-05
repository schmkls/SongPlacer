import { React, useState } from 'react';
import Globals from '../../../globals/Globals.css'
import Axios from 'axios';

const SUCCESS = 0;
const FAIL = 1;
const UNKNOWN = 2;

const PlaylistCreate = () => {

    const currUser = localStorage.getItem('user_id');


    const [playlist, setPlaylist] = useState();
    const [status, setStatus] = useState(UNKNOWN);

    /**
     * Adds playlists
     */
    const addPlaylist = async () => {

        //notice backticks ` 
        const postUrl = `http://localhost:3001/v1/library/${currUser}/create-playlist`;

        Axios.post(postUrl, {
            playlistName: playlist
        }).then((response) => {
            if (response.status === 200) {      //200 = OK, anything else indicates error
                setStatus(SUCCESS);
            } else {
                setStatus(FAIL);
            }
        }).catch((err) => {
            setStatus(FAIL);
        });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addPlaylist();
    }

    return (
        <div className="margin-top">
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    <p>Playlist name</p>
                    <input required type="text" onChange={e => setPlaylist(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Add playlist</button>
                </div>
            </form>
            {
                status === SUCCESS ?
                    <h2>Playlist added!</h2>
                    :
                    status === FAIL ?
                        <h2>Error, playlist could not be added</h2>
                        :
                        <></>
            }
        </div>
    );
}

export default PlaylistCreate;