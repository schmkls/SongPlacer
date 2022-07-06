import { React, useState, useEffect } from "react";
import Globals from '../../../globals/Globals.css';
import ChooseTrack from "../../../components/common/ChooseTrack/ChooseTrack";
import axios from "axios";
import accessHelp from "../../../accessHelp";

const SUCCESS = 0;
const FAIL = 1;
const UNKNOWN = 2;

/**
 * @returns page for adding songplace to a playlist,
 * or info playlist doesn't belong to current user
 */
const SongPlaceCreate = () => {
    
    const [isOwned, setIsOwned] = useState();
    const [track, setTrack] = useState();
    const [lat, setLatitude] = useState();
    const [long, setLongitude] = useState();
    const [playlistName, setPlaylistName] = useState("the playlist");

    const currUrl = new URL(window.location.href);
    const playlistId = currUrl.searchParams.get('playlist-id');

    const accessHelper = accessHelp();
    const currUser = accessHelper.getCurrUserId();

    const checkIfOwned = () => {
        return new Promise((res, rej) => {
            axios.get(`http://localhost:3001/v1/get-playlist/${playlistId}`)
            .then((result) => {
                if (result.status != 200) {
                    console.log("Could not check name and ownership")
                    res(false);
                }
                const userId = result.data[0].user_id;
                setPlaylistName(result.data[0].name);
                console.log("pl owner = " + userId + " and currUser = " + currUser);
                res(userId == currUser);
            })
            .catch((err) => {
                res(false);
            });
        });
        
    }
    

    /**
     * Posts songplace and returns id.
     * @returns id of songplace that was posted (will be null if posting failed)
     */
    const postSongPlace = () => {
        if (!track) {
            alert("No track chosen!");
            return;
        }

        if (!lat || !long) {
            alert("Position not chosen!");
            return;
        }

        console.log("posting sp with id: " + track.id);


        //notice backticks ` 
        const postUrl = `http://localhost:3001/v1/library/${currUser}/${playlistId}/create-songplace`;
        console.log("posting to url: " + postUrl);

        axios.post(postUrl, {
            trackId: track.id,
            latitude: lat,
            longitude: long,
            userId: currUser
        })
        .then((response) => {
            console.log("post response: " + JSON.stringify(response));

            //200 = OK, anything else indicates error
            if (response.status !== 200) {
                alert("Could not add songplace");
            } else {
                alert("Songplace added!");
            }
        })
        .catch((err) => {
            alert("Could not add songplace");
            window.location.reload();
        });

    };


    useEffect(() => {
        checkIfOwned().then((response) => {
            setIsOwned(response);
            console.log("useEffect set isOwned to: " + response);
        });
    }, [])

    useEffect(() => {
        console.log("track was set to: " + track?.name);
    }, [track])


    if (isOwned === undefined || isOwned == 'undefined' || isOwned == null) {
        return (
            <div className='margin-top'>
                <h2>Wait...</h2>
            </div>
        )
    }

    if (isOwned === false) {
        return ( 
            <div className='margin-top'>
                <h2>Cannot add songplace, not your playlist</h2>
            </div>
        )
    }

    return (
        <div className="margin-top">
            <h2>Add songplace to {playlistName}</h2>
            <ChooseTrack setTrack={setTrack}></ChooseTrack>
            <form>
                <label>
                    <p>Latitude</p>
                    <input
                        required
                        type="number"
                        min="-90"
                        max="90"
                        step="0.01"
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                </label>
                <label>
                    <p>Longitude</p>
                    <input
                        required
                        type="number"
                        min="-180"
                        max="180"
                        step="0.01"
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                </label>
                </form>
                <button onClick={() => postSongPlace()}>
                <h3>
                    Add songplace
                </h3>
            </button>
        </div>
    );
};

export default SongPlaceCreate;
