import { React, useState } from "react";
import Globals from '../../../globals/Globals.css';
import axios from "axios";
import accessHelp from "../../../accessHelp";

const SUCCESS = 0;
const FAIL = 1;
const UNKNOWN = 2;

const SongPlaceCreate = () => {
  

  const [song, setSong] = useState();
  const [lat, setLatitude] = useState();
  const [long, setLongitude] = useState();

  //success of songplace posting
  const [postStatus, setPostStatus] = useState(UNKNOWN);

  //success of connecting songplace to playlist
  const [connectStatus, setConnectStatus] = useState(UNKNOWN);

  const currUrl = new URL(window.location.href);
  const playlistId = currUrl.searchParams.get('playlist-id');
  const playlistName = currUrl.searchParams.get('playlist-name');

  const accessHelper = accessHelp();
  const currUser = accessHelper.getCurrUserId();



/**
 * Posts songplace and returns id.
 * @returns id of songplace that was posted (will be null if posting failed)
 */
const postSongPlace = async () => {
    let songplacePosted = null;

    console.log("posting songplace: " +
        "\nplaylistId = " + playlistId +
        "\nuserId = " + currUser +
        "\nsongplace = " + song
    );

    //notice backticks ` 
    const postUrl = `http://localhost:3001/library/${currUser}/${playlistId}/create-songplace`;

    axios.post(postUrl, {
            songplaceName: song,
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
        }
    );
};

  /**
   * Connects songplace that was posted to a playlist
   * @param id id of songplace
   */
  const connectSongplaceToPlayList = async (songplaceId) => {

  };

  /**
   * Adds song
   */
  const addSongPlace = () => {
    postSongPlace().then((id) => connectSongplaceToPlayList(id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addSongPlace();
  };

  return (
    <div className="margin-top">
      <h2>Add songplace to {playlistName}</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          <p>Song</p>
          <input
            required
            type="text"
            onChange={(e) => setSong(e.target.value)}
          />
        </label>
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
        <div>
          <button type="submit">Add songplace</button>
        </div>
      </form>
      {
        postStatus === SUCCESS ? 
            <h2>Songplace added!</h2>
          : 
            postStatus === FAIL ? 
              <h2>Error, songplace could not be added</h2>
            : 
              <></>
      }
      {
        connectStatus === FAIL ? 
            <h2>Songplace could not be added to playlist {playlistName}</h2>
        : 
            <></>
      }
    </div>
  );
};

export default SongPlaceCreate;