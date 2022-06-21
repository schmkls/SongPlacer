import { useNavigate } from "react-router-dom";
import Globals from '../../globals/Globals.css'


const Logout = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        goBack();
    }

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className='margin-top'>
            <h2>Log out?</h2>
            <button onClick={logout}>Yes</button>
            <button onClick={goBack}>No</button>
        </div>
    );
}

export default Logout;