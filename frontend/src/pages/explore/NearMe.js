import {React, useState, useEffect, useContext} from 'react';
import { UserContext } from '../../context';
import Axios from 'axios';
import Globals from '../../globals/Globals.css';
import ListedSongPlace from '../../components/common/ListedSongplace';

const SUCCESS = 0;
const FAIL = 1;
const LOADING = 2;
const UNKNOWN = 3;



const NearMe = () => {

    const userContext = useContext(UserContext);
    const userId = userContext.userId;

     //used to store/set songplaces 
     const [songplaces, setSongplaces] = useState();

    //used to store/set songplaces ordered by proximity
    const [sorted, setSorted] = useState(false);


    //used to store/set user position
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const [retrieveStatus, setRetrieveStatus] = useState(UNKNOWN);


    /**
     * Fetches songplaces after render 
     */
    useEffect(()=> {
        Axios.get("http://localhost:3001/get-songplaces").then((response) => {
            if (response.status != 200) {
                console.log("get songplaces response: " + response);
                setRetrieveStatus(FAIL);
                return;
            }   

            setSongplaces(response.data);
            setRetrieveStatus(SUCCESS);
        }).catch((err) => {
            console.log("get songplaces error");
            setRetrieveStatus(FAIL);
        });
    }, []);


    //calculates distance between two points a and b
    const calcDistance = (aLat, aLong, bLat, bLong) => {
        let vert = aLat - bLat;
        let horz = aLong - bLong;
        return Math.sqrt(vert * vert + horz * horz);
    }


    /**
     * Orders songplaces by proximity to given position and sets the variable: 'nearest'. 
     */
    const orderByNearest = (e) => {
        
        //reset if songplaces already sorted
        if (sorted) {
            window.location.reload(true);
        }

        e.preventDefault();     //in order not to reload page

        if (lat == null || long == null) {
            return;
        }

        if (songplaces == null) {
            setRetrieveStatus(FAIL);
            return;
        }

        songplaces.sort(function(songplaceA, songplaceB) {
            let aDistance = calcDistance(songplaceA.latitude, songplaceA.longitude, lat, long);
            let bDistance = calcDistance(songplaceB.latitude, songplaceB.longitude, lat, long);

            return aDistance - bDistance;
        });

        setSorted(true);
    }

    return (
        <div className="margin-top">
            <form onSubmit={(e) => orderByNearest(e)}>
                <label>
                    <p>Latitude</p>
                    <input
                        required
                        type="number"
                        min="0"
                        max="90"
                        step="0.01"
                        onChange={(e) => setLat(e.target.value)}
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
                        onChange={(e) => setLong(e.target.value)}
                    />
                </label>
                {
                    sorted ?
                            <div>
                                <button type="submit">Reset</button>
                            </div>
                        :
                            <div>
                                <button type="submit">Get nearest music</button>
                            </div>

                }
                
            </form>
            <hr/>
            {
                retrieveStatus === LOADING ? 
                        <h2>Loading...</h2>
                    :
                        <></>
            }
            {
                retrieveStatus === FAIL ? 
                        <h2>Could not get songplaces</h2>
                    :
                        <></>
            }
            {
                //return songplaces if they are retrieved and sorted
                retrieveStatus === SUCCESS && sorted ? 
                    songplaces.map((songplace, index) => (
                        <div>
                            <ListedSongPlace songplace={songplace} key={index} isOwned={false} playlistId={-1}/>
                        </div>   
                    ))
                :
                    <></>
            }                
        </div>
    )
}

export default NearMe;