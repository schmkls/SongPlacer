import {React, useState} from "react";
import Axios from 'axios';

const NOT_CREATED = 1;
const CREATION_FAILED = 2;
const CREATION_SUCCESS = 3;

/**
 * @returns page for creating a user 
 */
const CreateUser = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [creationStatus, setCreationStatus] = useState(NOT_CREATED);
    
    /**
     * Tries to submit user. 
     * @param e event of submitting form 
     */
    const handleSubmit = async(e) => {
        e.preventDefault(); //in order not to reload page

        Axios.post("http://localhost:3001/create-user", {
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


    return(
        <div className="login-wrapper">
            {console.log("returning CreateUser")}
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
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