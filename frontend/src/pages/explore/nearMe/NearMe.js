import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Globals from '../../../globals/Globals.css';
import ListedSongPlace from '../../../components/common/ListedSongplace/ListedSongplace';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons'

const FAIL = 1;
const PLAYING = 4;
const PAUSED = 5;
const UNSUPPORTED = 6;
const NONALLOWED = 7;



const NearMe = () => {

    const currUser = localStorage.getItem('user_id');

    //used to store/set user position
    const [lat, setLat] = useState();
    const [long, setLong] = useState();

    //play, paused, or failed
    const [play, setPlay] = useState(PAUSED);

    //the songplaces that are retrieved once
    var songplaces = null;

    //the songplaces to display, sorted by proximity
    const [displaySongplaces, setDisplaySongplaces] = useState([]);


    /**
     * Toggling play has the effect of making songplaces order by location 
     */
      useEffect(()=> {
        console.log("useEffect of toggling play");
        autoPlay(); 
    }, [play]);


    
    /**
     * Calculate distance between two points a and b of lat and long. 
     * Taken from: https://www.movable-type.co.uk/scripts/latlong.html
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

        return distance;
    }

    /**
     * @returns a promise with songplaces
     */
     const getSongplaces = async() => {
        return new Promise((res, rej) => {
            if (songplaces != null) {
                res(songplaces);
            }
    
            axios.get("http://localhost:3001/get-songplaces").then((response) => {
                if (response.status != 200) {
                    console.log("get songplaces failed, response: " + response);
                    res(null);
                }   
                songplaces = response.data;
                res(response.data);
            }).catch((err) => {
                res(null);
            });
        });
    }

    const handleGeolocationFail = (error) => {
        if (error.code == error.PERMISSION_DENIED) {
            setPlay(NONALLOWED);
        } else {
            setPlay(FAIL);
        }
    }

    /**
     * Gets users current position and then calls function to order songplaces by position
     */
    const getUserPosition = () => {
        console.log("getting user pos");
        if (!navigator.geolocation) {
            console.log("setting play to UNSUPPORTED")
            setPlay(UNSUPPORTED);
            return new Promise();
        }

        navigator.geolocation.getCurrentPosition(orderByPosition, handleGeolocationFail);
    }


    /**
     * Orders songplaces by proximity to given position 
     * @param position GeoLocationPosition (from navigator.geolocation.getCurrentPosition)
     */
     const orderByPosition = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setLat(lat);
        setLong(long);

        console.log("ordering by current position");

        getSongplaces().then((sps) => {
            if (sps == null) {
                setPlay(FAIL);
                return;
            }

            sps.sort(function(songplaceA, songplaceB) {
                let aDistance = calcDistance(songplaceA.latitude, songplaceA.longitude, lat, long);
                let bDistance = calcDistance(songplaceB.latitude, songplaceB.longitude, lat, long);
                return aDistance - bDistance;
            });

            setDisplaySongplaces(sps);
        }).catch((err) => setPlay(FAIL));
    }

    /**
     * Plays (sorts songplaces) while autoplay is on. 
     * 
     * Gets user position. 
     */
    const autoPlay = () => {
        if (play === UNSUPPORTED || play === FAIL) {
            console.log("cannot autoplay")
            return;
        }

        getUserPosition();  //function calls function to order songplaces
        
        if (PLAYING) {
            setTimeout(autoPlay, 20000);  //20 seconds
        }
    }

    const tryAgain = () => {
        window.location.reload();
    }

    const toggleAutoPlay = () => {
        if (play === PLAYING) {
            setPlay(PAUSED);
        } else {
            setPlay(PLAYING);
        }
    }

    if (play === NONALLOWED){
        return (
            <div className="margin-top">
                <h2>Location access must be allowed in browser</h2>
                <button onClick={() => tryAgain()}> Try again </button>
            </div>
        )
    }

    if (play === UNSUPPORTED) {
        return (
            <div className="margin-top">
                <h2>Browser does not support location</h2>
            </div>
        )
    } 

    if (play === FAIL) {
        return (
            <div className="margin-top">
                <h2>Sorry, could not get music by location.</h2>
                <button onClick={() => tryAgain()}> Try again </button>
            </div>
        )
    }

    return (
        <div className="margin-top">
            {
                play === PLAYING ? 
                        <div>
                            <h5>Playing music from: (  {lat}, {long} )</h5>
                            <button onClick={() => toggleAutoPlay()}>
                                <FontAwesomeIcon icon={faCirclePause} size='2x'/>
                            </button>
                        </div>
                    :
                        <div>
                            <h5>Play local music</h5>
                            <button onClick={() => toggleAutoPlay()}>
                                <FontAwesomeIcon icon={faCirclePlay} size='2x'/>
                            </button>
                        </div>
                    
            }
            <hr/>
             {
                play === PLAYING ?
                        displaySongplaces.map((songplace, index) => (
                            <ListedSongPlace songplace={songplace} key={index} isOwned={false} playlistId={-1}/>
                        ))
                    :
                        <h5>Press play to get songplaces from nearby</h5>
             }         
        </div>
    )
    

    
}

export default NearMe;