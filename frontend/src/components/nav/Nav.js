import './Nav.css';
import '../../globals/Globals.css';
import { React, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import pagesHelp from '../../pagesHelp';
import accessHelp from '../../accessHelp';

/**
 * Nav bar for app. Shows sidebar on click from < 2 steps in, else 
 * goes one step back. 
 */
const Nav = () => {

    //name for and links to pages
    const pagesHelper = pagesHelp();
    const pages = pagesHelper.pages;

    const accessHelper = accessHelp();

    //show library stuff if user is logged in
    const libraryAccess = accessHelper.userIsLoggedIn();


    //library url with user-id param
    let libraryUrl = pagesHelper.getURL(pages.library);
    libraryUrl.searchParams.set('user-id', accessHelper.getCurrUserId());

    const getDepth = () => {
        return window.location.href.split("/").length - 2;
    } 

    const getPageTitle = () => {
        return pagesHelper.getName(window.location.pathname);
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [depth, setDepth] = useState(getDepth());
    const [pageTitle, setPageTitle] = useState(getPageTitle());

   
    const toggle = () => {
        if (depth > 2) {
            window.history.go(-1);
            setMenuOpen(false);
        }  else {
            setMenuOpen(!menuOpen);
        }
    }

    
    return (
        <div className='nav-bar'>
            <h2 className='page-title'>{pageTitle}</h2>
            <button onClick={toggle} className='nav-btn' type='button'>

                {/*Back button if over 2 clicks in app, else menu/close-button*/}
                { getDepth() > 2 ? 
                            <FontAwesomeIcon icon={faArrowLeft} size='2x' className='icon nav-btn'/>
                        :
                        menuOpen ? 
                                <FontAwesomeIcon icon={faClose} size='2x' className='icon nav-btn'/>
                            :
                                <FontAwesomeIcon icon={faBars} size='2x' className='icon nav-btn'/>
                }    
            </button>
            
            {(menuOpen) ?
                    <div className='side-menu' > 
                        <ul>
                            <li>
                            {
                                libraryAccess ? 
                                        <a href={libraryUrl}>Library</a>
                                    :
                                        <a href={pagesHelper.getURL(pages.login)}> Login to access library </a>
                            }
                            </li>
                            <li>
                                <a href={pagesHelper.getURL(pages.nearMe)}>Near me</a>
                            </li>
                            <li>
                                <a href={pagesHelper.getURL(pages.searchUser)}>Search</a>
                            </li>
                            {
                                libraryAccess ? 
                                        <li>
                                            <a href={pagesHelper.getURL(pages.logout)}>Logout</a>
                                        </li>
                                    :
                                        <></>
                            }
                            
                        </ul>
                    </div>
                :
                    <></>
            }
        </div>      
    );
}

export default Nav;