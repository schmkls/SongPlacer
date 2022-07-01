import { React, useState, useContext } from "react";
import Axios from "axios";
import { UserContext } from "../../context";


/**
 * Component for editing playlist name. 
 */
const EditPlaylist = (props) => {
    
    const userContext = useContext(UserContext);
    const userId = userContext.userId;

    const playlistId = props.playlistId;
    const originalName = props.playlistName;
    const [newName, setNewName] = useState(originalName);
    const setPlaylistName = props.setPlaylistName;
    
    const changeName = (e) => {
        e.preventDefault();     //in order not to reload

        const putUrl = `http://localhost:3001/library/${userId}/update-playlist/${playlistId}`;

        Axios.put(putUrl, {
            playlistId: playlistId, 
            playlistName: newName
        }).then((response) => {
            if (response.status === 200) {      //200 = OK, anything else indicates error
                setPlaylistName(newName);
                console.log("change name success");
            } else {
                console.log("update playlist name response: " + response.status)
            }
        }).catch((err) => {
            console.log("update playlist name error")
        });        
    }

    return (
        <>
            {
                props.show ?
                    <form onSubmit={(e) => changeName(e)}>
                <label>
                    <p>Give new playlist name</p>
                    <input type="text" onChange={e => setNewName(e.target.value)}/>
                </label>
                <div>
                    <button type="submit">Change name</button>
                </div>
            </form>
                    :
                        <></>
            }
        </>
    )

}

export default EditPlaylist;