import axios from 'axios';

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
        }

        console.log("opening: " + name + "with id: " + id);

        const getUrl = `http://localhost:3002/get-track-url/${id}`;

        axios.get(getUrl)
        .then((res) => {
            window.location.assign(res.data.body.album.external_urls.spotify);
        })
        .catch((err) => console.log(err));
    }
    

    return (
        <div onClick={() => open()}>
            <hr/>
            <p>
                {name} ({makeArtistsString()})
            </p>
            <a href={image}>{image}</a>
        </div>
    )
}

export default Track;