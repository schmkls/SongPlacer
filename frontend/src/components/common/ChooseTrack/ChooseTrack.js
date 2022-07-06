
import {React, useState} from "react";
import SpotifyWebApi from "spotify-web-api-node";
import Track from "../Track/Track";

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

    const setTrack = props.setTrack;
    const [searchStr, setSearchStr] = useState();
    const [tracks, setTracks] = useState([]);


    const search = () => {
        spotifyApi.searchTracks('ballin')
        .then((data) => {
            console.log("data fr sökning: " + JSON.stringify(data));
        })
        .catch((err) => console.log("sökningserror: " + JSON.stringify(err)));

        console.log("searching for " + searchStr);
    }


    return (
        <div>            
            <input placeholder='Search track' onChange={(e) => setSearchStr(e.target.value)}/>
            <button onClick={() => search()}>Search</button>
            {
                tracks.map((track) => {
                    <Track/>
                })
            }
            <hr/>
            <h2>placeholder for map</h2>
        </div>
    )
}

export default ChooseTrack;