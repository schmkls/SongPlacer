
import Globals from '../../globals/Globals.css'
import Axios from 'axios';

const LoginCallback = () => {

    const code = new URLSearchParams(window.location.search).get("code");

    //Post code from login to receive token
    if (code) {
        Axios.post("http://localhost:3002/login", {
            code
        }).then((response)  => {
            console.log("login response: " + JSON.stringify(response));
        }).catch((err) => console.log("login error: " + err));
    }

    console.log("code is: " + code);
    return (
        <div className='margin-top'>
            <h2>Very cool redirected here after Spotify login</h2>
        </div>
    );
}

export default LoginCallback;