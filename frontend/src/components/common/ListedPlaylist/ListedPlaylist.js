import pagesHelp from "../../../pagesHelp";
import { React } from "react";


/**
 * @param {*} playlist object
 * @returns item to represent a playlist in a list
 */
 const ListedSongPlace = (props) => {

    const playlist = props.playlist;

    const pagesHelper = pagesHelp();
    const pages = pagesHelper.pages;

    const currUser = localStorage.getItem('user_id');


    const isOwned = (playlist.user_id === currUser);
    
    const openPlaylist = () => {
        if (isOwned) {
            let url = pagesHelper.getURL(pages.playlist);
            url.searchParams.set('playlist-id', playlist.id);
            window.location.href = url;
        } else {
            let url = pagesHelper.getURL(pages.searchedPlaylist);
            url.searchParams.set('playlist-id', playlist.id);
            window.location.href = url;
        }
    }

    return (
        <div>
            <hr/>
            <h2 onClick={() => openPlaylist()}>
                {playlist.name}
            </h2>
            <hr/>
        </div>
    );
}

export default ListedSongPlace;