import axios from 'axios';
import QueueBtn from '../queueBtn/QueueBtn';

/**
 * 
 * @param props track data 
 * @returns component displaying track that can choose track on click 
 */
const Track = (props) => {
    const openable = props.openable;
    const track = props.track;
    const id = track.id;
    const name = track.name;
    const image = track.album.images[0].url;
    const artists = track.artists;


    const makeArtistsString = () => {
        let str = '';

        artists.map((artist, index) => {
            if (index < artists.length && index > 0 && artists.length > 1) {
                str += ", "
            }

            str += artist.name;
        })

        return str;
    }


    const open = () => {
        if (!openable) {
            return;
        } else {
                
            const getUrl = `http://localhost:3002/get-track-url/${id}`;

            axios.get(getUrl)
            .then((res) => {
                window.location.assign(res.data.body.album.external_urls.spotify);
            })
            .catch((err) => console.log(err));
        }
        
    }
    

    return (
        <div>
            <hr/>
            <p onClick={() => open()}>
                {name} ({makeArtistsString()})
            </p>
            <img src={image} width="50" height="50"/>
            <QueueBtn track={track}/>
        </div>
    )
}

export default Track;