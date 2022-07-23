import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const PlayBtn = (props) => {

    const [playing, setPlaying] = useState(false);

    const pause = () => {
        props.pauseFunction();
        setPlaying(false);
    }

    const play = () => {
        props.playFunction();
        setPlaying(true);
    }

    if (playing === true) {
        return (
            <button onClick={() => pause()}>
                <FontAwesomeIcon icon={faCirclePause} size='2x'/>
            </button>  
        )
    }

    if (playing === false) {
        return (
            <button onClick={() => play()}>
                <FontAwesomeIcon icon={faCirclePlay} size='2x'/>
            </button>  
        )
    }
}

export default PlayBtn;