import {React, useState, useEffect} from 'react';
import SpotifyWebApi from "spotify-web-api-node";
import axios from 'axios';
import Globals from '../../../globals/Globals.css'
import Track from '../track/Track';
import accessHelp from '../../../accessHelp';
import pagesHelp from '../../../pagesHelp';

//todo: flytta detta till spotify_server
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SONGPLACER_CLIENT_ID, 
    clientSecret: process.env.SONGPLACER_CLIENT_SECRET
})

spotifyApi.setAccessToken(accessHelp().getSpotifyAccessToken(5));

/**
 * @param trackId spotify track id
 * @param playlistId if songplace is in playlist: id of playlist
 * 
 * @returns item to represent a songplace in a list. If playlistId given
 * in url-params: songplace is deleteable. 
 */
const ListedSongPlace = (props) => {

    const [track, setTrack] = useState();

    const id = props.id;
    const trackId = props.trackId;
    const playlistId = props.playlistId;
    const isOwned = props.isOwned;

    const accessHelper = accessHelp();
    const pagesHelper = pagesHelp();

    const currUser = accessHelper.getCurrUserId();

 
    const deleteSongplace = () => {
         //notice backticks ` 
        const deleteUrl = `http://localhost:3001/v1/library/${currUser}/${playlistId}/${id}/delete-songplace`;

        axios.delete(deleteUrl).then((response) => {
            console.log("songplace delete status: " + response.status);
            if (response.status == 200) {
                window.location.reload();
            }
        }).catch((err) => {
            console.log("delete songplace error")
        });
    }


    /**
     * Gets the track from Spotify API
     */
    useEffect(() => {
        spotifyApi.getTrack(trackId)
        .then((track) => {
            setTrack(track.body);
        });
    }, []);


    if (!track) {
        return (
            <div>
                <h3>loading...</h3>
            </div>
        )
    }

    return (
        <div>
            <hr/>
            <Track track={track} openable={true}></Track>
            {
                isOwned ?
                        <button onClick={() => deleteSongplace()}> Delete </button>
                    :
                        <></>
            }
            <hr/>
        </div>
    );
}

export default ListedSongPlace;