import {React, useState, useEffect} from 'react';
import Globals from '../../globals/Globals.css'

const SearchUser = (props) => {

    //all users
    const [allUsers, setAllUsers] = useState([]);

    //users to be displayed when searching
    const [displayUsers, setDisplayUsers] = useState([]);

    /**
     * Search for users and set users to display. 
     */
    const searchUsers = (str) => {
        console.log("searching for user: " + str);
        let users = allUsers;
        const searchStr = str.toLowerCase();

        if (searchStr === '') {
            setDisplayUsers(users);
        }

        users = users.filter(user => {
            if (user.str.includes(searchStr)) {
                console.log(user.str + " includes " + searchStr);
                return true;
            }
        })

        setDisplayUsers(users);
        
        users.map((user) => console.log(user.str));

    }


    /**
     * Fetch all users
     */
    useEffect(() => {
        const users = [{str: 'aaa'}, {str: 'bbb'}];
        setAllUsers(users);
        setDisplayUsers(users);
    }, []);

    return (
        <div className='margin-top'>
            <input placeholder='Search users' onChange={(e) => searchUsers(e.target.value)}/>
            {
                displayUsers.map((data, index) => (
                    <h2 key={index}>{data.str}</h2>
                ))
            }
        </div>
    )
}

export default SearchUser;