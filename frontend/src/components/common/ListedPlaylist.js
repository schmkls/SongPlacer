import usePages from "../../pages/usePages";
import { useSearchParams } from "react-router-dom";

/**
 * @param {*} playlist object
 * @returns item to represent a playlist in a list
 */
 const ListedSongPlace = (props) => {

    const playlist = props.playlist;

    const pagesObj = usePages();
    const pages = pagesObj.pages;
    

    const openPlaylist = () => {
        window.location.href += (pages.specificplaylist.urlEnding + "/" + playlist.name + "/" + playlist.id);
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