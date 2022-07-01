import {React, useState, useEffect} from 'react';
import Axios from 'axios';
import Globals from '../../globals/Globals.css'
import ListedUser from '../../components/common/ListedUser';

const ERROR = 1;

const SearchUser = (props) => {

    //all users, set once at page load
    const [allUsers, setAllUsers] = useState([]);

    //users to be displayed when searching
    const [displayUsers, setDisplayUsers] = useState([]);
    
    const [status, setStatus] = useState();

    /**
     * Search for users and set users to display. 
     */
    const searchUsers = (str) => {
        let users = allUsers;
        const searchStr = str.toLowerCase();

        if (searchStr === '') {
            setDisplayUsers([]);
            return;
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
            setAllUsers(response.data);
        }).catch((err) => {
            setStatus(ERROR);
            console.log(err);
        });
    }, []);


    return (
        <div className='margin-top'>
            <input placeholder='Search users' onChange={(e) => searchUsers(e.target.value)}/>
            {
                displayUsers.map((user, index) => (
                    <ListedUser user={user} key={index}/>
                ))
            }
            {
                status === ERROR ? 
                        <h2>Error: users could not be retrieved</h2>
                    :   
                        <></>
            }
        </div>
    )
}

export default SearchUser;