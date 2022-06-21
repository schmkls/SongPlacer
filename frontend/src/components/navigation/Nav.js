import './Nav.css';
import '../../globals/Globals.css';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowLeft, faClose } from '@fortawesome/free-solid-svg-icons';
import usePages from '../../pages/usePages';

/**
 * Nav bar for app. Shows sidebar on click from < 2 steps in, else 
 * goes one step back. 
 */
const Nav = (props) => {

    //name for and links to pages
    const pagesObj = usePages();
    const pages = pagesObj.pages;
    
    const getDepth = () => {
        return window.location.href.split("/").length - 2;
    } 

    const getPageTitle = () => {
        let currentLocation = window.location.pathname;

        for (let pair in pages) {
            if (!pages.hasOwnProperty(pair)) continue;

            let obj = pages[pair];
            let urlEnding = obj['urlEnding'];
            if (urlEnding === currentLocation) {
                return obj['name'];
            }
        }
    }

    const [menuOpen, setMenuOpen] = useState(false);
    const [depth, setDepth] = useState(getDepth());
    const [pageTitle, setPageTitle] = useState(getPageTitle());

    const navigate = useNavigate();
   
    const toggle = () => {
        if (depth > 2) {
            navigate(-1);
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
                    <div className='side-menu'> 
                        <ul>
                            <li>
                                <a href={pages.library.fullUrl}>Library</a>
                            </li>
                            <li>
                                <a href={pages.nearme.fullUrl}>Near me</a>
                            </li>
                            <li>
                                <a href={pages.logout.fullUrl}>Logout</a>
                            </li>
                        </ul>
                    </div>
                :
                    <></>
            }
        </div>      
    );
}

export default Nav;