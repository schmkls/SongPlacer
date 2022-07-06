/**
 * 
 * @param {} props track data 
 * @returns component displaying track that can choose track on click 
 */
const Track = (props) => {
    const id = props.id;
    const name = props.name;
    const image = props.image;

    const setChosen = props.setChosen;

    return (
        <div onClick={() => setChosen(id)}>
            <hr/>
            <p>{name}</p>
            <a href={image}>{image}</a>
        </div>
    )
}

export default Track;