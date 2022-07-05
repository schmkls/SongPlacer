import'./ExploreMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCirclePlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import pagesHelp from '../../../pagesHelp';
import accessHelp from '../../../accessHelp';
import axios from 'axios';

/**
 * Bottom bar for explore-page
 */
const ExploreMenu = () => {

    const pagesHelper = pagesHelp();
    const accessHelper = accessHelp();
    const userId = accessHelper.getCurrUserId();


    const nearMeClick = () => {
        window.location.href = pagesHelper.getURL(pagesHelper.pages.nearMe);
    }


    const navigateToPlaylist = (playlistId) => {
        const url = pagesHelper.getURL(pagesHelper.pages.addSongplace);
        url.searchParams.set('playlist-id', playlistId);
        window.location.href = url;
    }

    //Creates default playlist and navigates to add songplace to it
    const createDefaultPlaylist = () => {
        axios.post(`http://localhost:3001/create-default-playlist/${userId}`).then((res) => {
            navigateToPlaylist(res.data.insertId);
        }).catch((err) => {
            alert("Could not create default playlist");
        });
    }

    //Goes to adding page for default playlist
    const goToDefaultSongplaceAdd = () => {
        axios.get(`http://localhost:3001/get-default-playlist/${userId}`).then((res) => {
            if (res.data.length == 0) {
                console.log("no default playlist, creating default playlist");
                createDefaultPlaylist();
            } else {
                navigateToPlaylist(res.data[0].id);
            }
            console.log("def pl resp: " + JSON.stringify(res));
        }).catch((err) => {
            alert("Could not go to add songplace");
        });
    }

    const addClick = () => {
        if (accessHelper.userIsLoggedIn()) {
            goToDefaultSongplaceAdd();
        } else {
            if (window.confirm("Login requiered. Login?")) {
                window.location.href = pagesHelper.getURL(pagesHelper.pages.login);
            }
        }
        
    }

    const searchClick = () => {
        window.location.href = pagesHelper.getURL(pagesHelper.pages.searchUser);
    }

    return (
        <div className='bottom-bar'>
            <button onClick={() => nearMeClick()}><FontAwesomeIcon icon={faLocationDot} size="2x"/>Near me</button>
            <button onClick={() => addClick()}><FontAwesomeIcon icon={faCirclePlus} size="2x"/>Add songplace</button>
            <button onClick={() => searchClick()}><FontAwesomeIcon icon={faSearch} size="2x"/>Search users</button>
        </div>  
    )
}

export default ExploreMenu;