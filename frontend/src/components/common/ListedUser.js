import {React, useState, useContext} from 'react';
import Axios from 'axios';
import Globals from '../../globals/Globals.css'
import { UserContext } from '../../context';
import usePages from '../../pages/usePages';

/**
 * @param {*} user object
 * @returns item to represent a user in a list
 */
const ListedUser = (props) => {

    const user = props.user;
    const context = useContext(UserContext);
    const currUserId = context.userId;

    const isCurrentUser = (currUserId === user.id);

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;

    const openUser = (userId) => {
        console.log("opening user " + userId);

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