import {React} from 'react';
import Axios from 'axios';
import Globals from '../../globals/Globals.css'
import usePages from '../../pages/pagesHelp';

/**
 * @param {*} user object
 * @returns item to represent a user in a list
 */
const ListedUser = (props) => {

    const user = props.user;
    const currUser = localStorage.getItem('user_id');


    const isCurrentUser = (currUser === user.id);

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;

    const openUser = (userId) => {
        console.log("opening user " + userId);
        let url = pagesHelp.getURL(pages.searchedLibrary);
        url.searchParams.set('user-id', userId);
        window.location.href = url;
    }

    return (
        <div onClick={() => openUser(user.id)}>
            <hr/>
            <h2>
                {user.username}
            </h2>
            {
                isCurrentUser ?
                        <h5>(you)</h5>
                    :
                        <></>
            }
            <hr/>
        </div>
    );
}

export default ListedUser;