import {React, useState, useEffect} from 'react';
import Axios from 'axios';
import Globals from '../../globals/Globals.css'

const SearchUser = (props) => {

    //all users, set once at page load
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
            const username = user.username.toLowerCase();
            if (username.includes(searchStr)) {
                return true;
            }
        })

        setDisplayUsers(users);
    }


    /**
     * Fetch all users
     */
    useEffect(() => {
        Axios.get("http://localhost:3001/get-users")
        .then((response) => {
            const users = response.data;
            setAllUsers(users);
            setDisplayUsers(users);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div className='margin-top'>
            <input placeholder='Search users' onChange={(e) => searchUsers(e.target.value)}/>
            {
                displayUsers.map((data, index) => (
                    <h2 key={index}>{data.username}</h2>
                ))
            }
        </div>
    )
}

export default SearchUser;