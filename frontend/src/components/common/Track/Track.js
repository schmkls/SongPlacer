/**
 * 
 * @param {} props track data 
 * @returns component displaying track that can choose track on click 
 */
const Track = (props) => {

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

    return (
        <div onClick={props.onClick}>
            <hr/>
            <p>
                {name} ({makeArtistsString()})
            </p>
            <a href={image}>{image}</a>
        </div>
    )
}

export default Track