

const Track = (props) => {
    const id = props.id;
    const name = props.name;
    const albumCover = props.albumCover;

    const setTrack = props.setTrack;

    return (
        <div onClick={() => setTrack(id)}>
            <p>some track</p>
        </div>
    )
}

export default Track;