import usePages from "../../pages/usePages";
import { useSearchParams } from "react-router-dom";

/**
 * @param {*} playlist object
 * @returns item to represent a playlist in a list
 */
 const ListedSongPlace = (props) => {

    const playlist = props.playlist;
    const playlistId = playlist.id;

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;
    

    const openPlaylist = () => {
        let url = pagesHelp.getURL(pages.specificplaylist);
        url.searchParams.set('playlist-id', playlistId);
        window.location.href = url;
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