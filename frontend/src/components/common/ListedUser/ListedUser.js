import Globals from '../../../globals/Globals.css'
import usePages from '../../../pagesHelp';
import accessHelp from '../../../accessHelp';

/**
 * @param {*} user object
 * @returns item to represent a user in a list
 */
const ListedUser = (props) => {

    const accessHelper = accessHelp();
    const user = props.user;

    const isCurrentUser = accessHelper.isCurrUser(user.id);

    const pagesHelp = usePages();
    const pages = pagesHelp.pages;

    const openUser = (userId) => {
        console.log("opening user " + userId);
        let url = pagesHelp.getURL(pages.searchedLibrary);
        url.searchParams.set('user-id', userId);
        window.location.href = url;
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