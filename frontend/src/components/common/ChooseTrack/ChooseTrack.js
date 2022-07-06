
import {React, useState} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../Track/Track";


const SEARCHING = 1;
const NOT_SEARCHING = 2;

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SONGPLACER_CLIENT_ID, 
    clientSecret: process.env.SONGPLACER_CLIENT_SECRET
})

spotifyApi.setAccessToken(localStorage.getItem('access_token'));

/**
 * @param {*} props should contain useState setTrack to set the track that is chosen
 * @returns component for searching and choosing a Spotify track
 */
const ChooseTrack = (props) => {

    const [searchStr, setSearchStr] = useState();
    const [tracks, setTracks] = useState();
    const [state, setState] = useState(NOT_SEARCHING);
    const [chosen, setChosen] = useState();
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const chooseSong = (track) => {
        if (chosen?.id === track.id) {
            unChoose();
        } else {
            setChosen(track);
            props.setTrack(track);  //choose new track
        }
    }

    const unChoose = () => {
        setChosen();
        props.setTrack();
    }


    const search = () => {
        setChosen();
        setTracks();
        setState(SEARCHING);
        spotifyApi.searchTracks(searchStr)
        .then((data) => {
            setTracks(data.body.tracks.items);
            setState(NOT_SEARCHING);
        })
        .catch((err) => {
            setState(NOT_SEARCHING);
            alert("Could not search");
        });
    }


    return (
        <div>            
            <input placeholder='Search track' onChange={(e) => {
                setSearchStr(e.target.value)
                if (e.target.value.length == 0) {
                    console.log("empty str!!!!");
                    unChoose();
                    setTracks();
                }
            }}/>
            <button onClick={() => search()}>Search</button>
            {
                chosen ? 
                    <Track onClick={() => chooseSong(chosen)} track={chosen}/>
                :
                    tracks?.map((track, index) => (
                        <Track onClick={() => {
                            chooseSong(track);
                            console.log("choosing: " + track.name);
                        }} track={track} key={index}/>
                    ))
            }
            {
                state === SEARCHING ? 
                        <h3>Searching...</h3>
                    :
                        <></>

            }
            <hr/>
            <h2>placeholder for map</h2>
        </div>
    )
}

export default ChooseTrack;