import { React, useState, useEffect } from "react";
import axios from 'axios';
import accessHelp from "../../../accessHelp";

const NOT_CREATED = 1;
const CREATION_FAILED = 2;
const CREATION_SUCCESS = 3;

/**
 * @returns page for creating a user 
 */
const CreateUser = () => {

    const accessHelper = accessHelp();

    /* const accessToken = localStorage.getItem('access_token'); */
    const accessToken = accessHelper.getSpotifyAccessToken();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [defaultUserName, setDefaultUsername] = useState("");
    const [creationStatus, setCreationStatus] = useState(NOT_CREATED);

    /**
     * Tries to submit user. 
     * @param e event of submitting form 
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); //in order not to reload page

        axios.post("http://localhost:3001/v1/create-user", {
            userName: username,
            password: password
        }).then((response) => {
            if (response.status === 200) {      //200 = OK, anything else indicates error
                setCreationStatus(CREATION_SUCCESS);
            } else {
                setCreationStatus(CREATION_FAILED);
            }
        }).catch((err) => {
            setCreationStatus(CREATION_FAILED);
        });
    }

    /**
     * Sets default username
     */
     
    useEffect(() => {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            }
        }).then((response) => {
            console.log("get user info response: " + JSON.stringify(response));
            setDefaultUsername(response.data.display_name);
        }).catch((err) => console.log("get user info error: " + err)); 
    }, []);




    return (
        <div className="login-wrapper">
            {console.log("returning CreateUser")}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} placeholder={defaultUserName}/>
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Create new user</button>
                </div>
            </form>

            {
                creationStatus === CREATION_SUCCESS ?
                    <h2>User created</h2>
                    :
                    creationStatus === CREATION_FAILED ?
                        <h2>Could not create user</h2>
                        :
                        <></>
            }
        </div>
    )
}


export default CreateUser;