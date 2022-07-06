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
    
    const [track, setTrack] = useState();
    const [lat, setLatitude] = useState();
    const [long, setLongitude] = useState();
    const [isOwned, setIsOwned] = useState(false);
    const [playlistName, setPlaylistName] = useState("the playlist");

    //success of songplace posting
    const [postStatus, setPostStatus] = useState(UNKNOWN);

    const currUrl = new URL(window.location.href);
    const playlistId = currUrl.searchParams.get('playlist-id');

    const accessHelper = accessHelp();
    const currUser = accessHelper.getCurrUserId();


    const chooseTrack = (id) => {
        console.log("ADD PAGE CHOSE TRACK WITH ID: " + id);
        if (track == id) {
            setTrack(); //unchoose
        } else {
            setTrack(id);   //choose track 
        }
    }


    /**
     * Posts songplace and returns id.
     * @returns id of songplace that was posted (will be null if posting failed)
     */
    const postSongPlace = async () => {

        //notice backticks ` 
        const postUrl = `http://localhost:3001/v1/library/${currUser}/${playlistId}/create-songplace`;

        axios.post(postUrl, {
            songplaceName: track,
            latitude: lat,
            longitude: long,
        }
        ).then((response) => {
            //200 = OK, anything else indicates error
            if (response.status === 200) {
                setPostStatus(SUCCESS);
            } else {
                setPostStatus(FAIL);
            }
        }
        ).catch((err) => {
            setPostStatus(FAIL);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postSongPlace();
    };

    /**
     * Set isOwned to true if current user owns playlist
     * Sets playlist name
     */
    useEffect(()=> {
        axios.get(`http://localhost:3001/v1/get-playlist/${playlistId}`)
        .then((result) => {
            const userId = result.data[0].user_id;
            setPlaylistName(result.data[0].name);
            console.log("pl owner = " + userId + " and currUser = " + currUser);
            setIsOwned(userId == currUser);
        })
        .catch((err) => {
            console.log("check if playlist owned error: " + err);
            setIsOwned(false);
        });
    }, []);

    useEffect(() => {
        console.log("track was set to: " + track);
    }, [track])


    if (!isOwned) {
        return (
            <div className='margin-top'>
                <h2>Cannot add songplace, not your playlist</h2>
            </div>
            
        )
    }

    return (
        <div className="margin-top">
            <h2>Add songplace to {playlistName}</h2>
            <ChooseTrack chooseTrack={chooseTrack}></ChooseTrack>
            <button onClick={() => postSongPlace()}>
                <h3>
                    Add songplace
                </h3>
            </button>
            {
                postStatus === SUCCESS ?
                    <p>Songplace added!</p>
                    :
                    postStatus === FAIL ?
                        <p>Error, songplace could not be added</p>
                        :
                        <></>
            }
        </div>
    );
};

export default SongPlaceCreate;
