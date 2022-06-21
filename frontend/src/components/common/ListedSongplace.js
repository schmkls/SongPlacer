import {React, useState, useContext} from 'react';
import Axios from 'axios';
import Globals from '../../globals/Globals.css'
import { UserContext } from '../../context';

/**
 * @param {*} songPlace object
 * @returns item to represent a songplace in a list
 */
const ListedSongPlace = (props) => {

    const songplace = props.songplace;
    const playlistId = props.playlistId;
    const isOwned = props.isOwned;

    const context = useContext(UserContext);
    const userId = context.userId;
 
    const deleteSongplace = () => {

         //notice backticks ` 
        const deleteUrl = `http://localhost:3001/library/${userId}/${playlistId}/${songplace.id}/delete-songplace`;

        Axios.delete(deleteUrl).then((response) => {
            console.log("songplace delete status: " + response.status);
            if (response.status == 200) {
                window.location.reload(true);
            }
        }).catch((err) => {
            console.log("delete songplace error")
        });
    }

    return (
        <div>
            <hr/>
            <h5>
                {songplace.name} ({songplace.latitude}, {songplace.longitude})
            </h5>
            {
                isOwned ?
                        <button onClick={() => deleteSongplace()}> Delete </button>
                    :
                        <></>
            }
            <hr/>
        </div>
    );
}

export default ListedSongPlace;