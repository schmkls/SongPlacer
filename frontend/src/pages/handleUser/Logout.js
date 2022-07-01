import Globals from '../../globals/Globals.css'


const Logout = () => {


    const logout = () => {
        localStorage.clear();
        goBack();
    }

    const goBack = () => {
        window.history.go(-1);
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