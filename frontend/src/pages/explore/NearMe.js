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

    //used to make page render
    const [updSwitch, setUpdSwitch] = useState(false);


    //used to store/set user position
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    const [retrieveStatus, setRetrieveStatus] = useState(UNKNOWN);


    const setCoordinates = (position) => {

    }

    const getCoordinatesErrorHandle = () => {
        
    }

    /**
     * Get user position 
     */
       useEffect(()=> {
        //https://www.codeunderscored.com/how-to-get-a-user-location-using-html-and-javascript/
    }, []);



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
            console.log("get songplaces response: " + JSON.stringify(response));
            setSongplaces(response.data);
            setRetrieveStatus(SUCCESS);
        }).catch((err) => {
            console.log("get songplaces error");
            setRetrieveStatus(FAIL);
        });
    }, []);


    /**
     * Calculate distance between two points a and b of lat and long. 
     * Taken fromn: https://www.movable-type.co.uk/scripts/latlong.html
     * @param aLat point a latitude
     * @param aLong point a longitude
     * @param bLat point b latitude
     * @param bLong point b longitude
     * @returns distance between given points
     */
    const calcDistance = (lat1, lon1, lat2, lon2) => {

        const R = 6371e3; // metres
        const φ1 = lat1 * Math.PI/180; // φ, λ in radians
        const φ2 = lat2 * Math.PI/180;
        const Δφ = (lat2-lat1) * Math.PI/180;
        const Δλ = (lon2-lon1) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const distance = R * c; // in metres

        console.log("distance: " + distance);
        
        return distance;
    }

    


    /**
     * Orders songplaces by proximity to given position and sets the variable: 'nearest'. 
     */
    const orderByNearest = (e) => {
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

        setUpdSwitch(!updSwitch);
    }

    //todo default ens position
    return (
        <div className="margin-top">
            <form onSubmit={(e) => orderByNearest(e)}>
                <label>
                    <p>Latitude</p>
                    <input
                        required
                        type="number"
                        min="-90"
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
                        min="-180"
                        max="180"
                        step="0.01"
                        onChange={(e) => setLong(e.target.value)}
                    />
                </label>
            
                <button type="submit">Get nearest music</button>
            </form>
            <button onClick={() => window.location.reload()}>Clear</button>

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
                //return songplaces if they are retrieved
                retrieveStatus === SUCCESS ? 
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