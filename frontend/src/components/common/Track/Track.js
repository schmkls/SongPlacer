import { useState } from "react";

/**
 * 
 * @param {} props track data 
 * @returns component displaying track that can choose track on click 
 */
const Track = (props) => {

    const chooseTrack = props.chooseTrack;

    const [isChosen, setIsChosen] = useState(false);

    const track = props.track;
    const id = track.id;
    const name = track.name;
    const image = track.album.images[0].url;
    const artists = track.artists;


    /**
     * Choose this track. 
     */
    const choose = () => {
        chooseTrack(id);
        setIsChosen(!isChosen);
    }

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
        <div onClick={() => choose()}>
            <hr/>
            <p>
                {name} ({makeArtistsString()})
            </p>
            <a href={image}>{image}</a>
            {
                isChosen ? 
                        <h3>Chosen!</h3>
                    :
                        <></>

            }
        </div>
    )
}

export default Track