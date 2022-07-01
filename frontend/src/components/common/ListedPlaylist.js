import usePages from "../../pages/usePages";
import { useContext, React } from "react";
import { UserContext } from "../../context";

/**
 * @param {*} playlist object
 * @returns item to represent a playlist in a list
 */
 const ListedSongPlace = (props) => {

    const playlist = props.playlist;

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;

    const context = useContext(UserContext);
    const currUser = context.userId;

    const isOwned = (playlist.user_id === currUser);
    
    const openPlaylist = () => {
        if (isOwned) {
            let url = pagesHelp.getURL(pages.playlist);
            url.searchParams.set('playlist-id', playlist.id);
            window.location.href = url;
        } else {
            let url = pagesHelp.getURL(pages.searchedPlaylist);
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