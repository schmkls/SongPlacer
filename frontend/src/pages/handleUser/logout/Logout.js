import Globals from '../../../globals/Globals.css'
import accessHelp from '../../../accessHelp';
import pagesHelp from '../../../pagesHelp';

const Logout = () => {

    const accessHelper = accessHelp();
    const pagesHelper = pagesHelp();
    
    const logout = () => {
        accessHelper.logout();        
        window.location.href = pagesHelper.getURL(pagesHelper.pages.explore);    
    }

    const goBack = () => {
        window.history.go(-1);
    }

    return (
        <div className='margin-top'>
            <h2>Log out?</h2>
            <button onClick={() => logout()}>Yes</button>
            <button onClick={() => goBack()}>No</button>
        </div>
    );
}

export default Logout;