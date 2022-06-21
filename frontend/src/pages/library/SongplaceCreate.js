import { React, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context";
import Globals from "../../globals/Globals.css";
import Axios from "axios";

const SUCCESS = 0;
const FAIL = 1;
const UNKNOWN = 2;

const SongPlaceCreate = () => {
  
  const userContext = useContext(UserContext);
  const userId = userContext.userId;

  const [song, setSong] = useState();
  const [lat, setLatitude] = useState();
  const [long, setLongitude] = useState();

  //success of songplace posting
  const [postStatus, setPostStatus] = useState(UNKNOWN);

  //success of connecting songplace to playlist
  const [connectStatus, setConnectStatus] = useState(UNKNOWN);

  const { playlistId } = useParams();
  const { playlistName } = useParams();

  /**
   * Posts songplace and returns id.
   * @returns id of songplace that was posted (will be null if posting failed)
   */
  const postSongPlace = async () => {
    let songplacePosted = null;

    console.log("posting songplace: " + 
      "\nplaylistId = " + playlistId +  
      "\nuserId = " + userId + 
      "\nsongplace = " + song
    );

    //notice backticks ` 
    const postUrl = `http://localhost:3001/library/${userId}/${playlistId}/create-songplace`;

    Axios.post(postUrl, {
      songplaceName: song,
      latitude: lat,
      longitude: long,
    })
    .then((response) => {
      //200 = OK, anything else indicates error
      if (response.status === 200) {
        setPostStatus(SUCCESS);
      } else {
        setPostStatus(FAIL);
      }
    })
    .catch((err) => {
      setPostStatus(FAIL);
    });
  };

  /**
   * Connects songplace that was posted to a playlis
   * @param id id of songplace
   */
  const connectSongplaceToPlayList = async (songplaceId) => {};

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
            min="0"
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
            min="0"
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
