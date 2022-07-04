import'./ExploreMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faCirclePlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import pagesHelp from '../../../pagesHelp';


/**
 * Bottom bar for explore-page
 */
const ExploreMenu = () => {

    const pagesHelper = pagesHelp();

    const nearMeClick = () => {
        window.location.href = pagesHelper.getURL(pagesHelper.pages.nearMe);
    }

    const addClick = () => {
        console.log("ADD SONGPLACE NOT TO LIBRARY NOT YET IMPLEMENTED");
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