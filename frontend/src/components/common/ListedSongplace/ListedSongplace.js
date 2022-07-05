import {React} from 'react';
import axios from 'axios';
import Globals from '../../../globals/Globals.css'

/**
 * @param {*} songPlace object
 * @returns item to represent a songplace in a list
 */
const ListedSongPlace = (props) => {

    const songplace = props.songplace;
    const playlistId = props.playlistId;
    const isOwned = props.isOwned;

    const currUser = localStorage.getItem('user_id');

 
    const deleteSongplace = () => {

         //notice backticks ` 
        const deleteUrl = `http://localhost:3001/library/${currUser}/${playlistId}/${songplace.id}/delete-songplace`;

        axios.delete(deleteUrl).then((response) => {
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