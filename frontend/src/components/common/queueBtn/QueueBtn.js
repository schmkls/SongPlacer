import axios from 'axios';
import accessHelp from '../../../accessHelp';

/**
 * Button for queueing a track. 
 */
const QueueBtn = (props) => {
    
    const track = props.track;
    const accessHelper = accessHelp();

    /** 
     * Queues the track in players Spotify. 
     */
    const queueTrack = () => {
        console.log("enqueueing " );
    
        const accessToken = accessHelper.getSpotifyAccessToken();
        const postUrl = `https://api.spotify.com/v1/me/player/queue?uri=${track.uri}`;

        axios.post(postUrl, null, { 
            headers: { Authorization: `Bearer ${accessToken}`} 
        })
        .then((response) => {
            console.log("get user info response: " + JSON.stringify(response));
        })
        .catch((err) => console.log("get user info error: " + err));
    }

    return (
        <button onClick={() => queueTrack()}>
            <p>Add to queue</p>
        </button>
    );
}   

export default QueueBtn;