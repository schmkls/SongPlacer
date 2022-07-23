import {React, useState, useEffect} from 'react';
import axios from 'axios';
import Globals from '../../../globals/Globals.css';
import ListedSongPlace from '../../../components/common/listedSongplace/ListedSongplace';
import PlayBtn from '../../../components/common/playBtn/PlayBtn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay, faCirclePause } from '@fortawesome/free-solid-svg-icons'
import accessHelp from '../../../accessHelp';

const FAIL = 1;
const PLAYING = 4;
const PAUSED = 5;
const UNSUPPORTED = 6;
const NONALLOWED = 7;


/**
 * Page to show/play/queue songplaces ordered by current (updating) position. 
 * @returns a page
 */

const NearMe = () => {

    //songplaces that are retrieved once 
    var allSongplaces;

    const accessHelper = accessHelp();
    const currUser = accessHelper.getCurrUserId();

    //used to store/set user position
    const [lat, setLat] = useState();
    const [long, setLong] = useState();
    const [statuz, setstatuz] = useState();
    const [position, setPosition] = useState();

    //the songplaces that are retrieved once
    var songplaces = null;

    //the songplaces to display, sorted by proximity
    const [displaySongplaces, setDisplaySongplaces] = useState([]);

    
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
            if (allSongplaces != null) {
                res(allSongplaces);
            }

            axios.get("http://localhost:3001/v1/get-songplaces").then((response) => {
                if (response.status != 200) {
                    rej();
                }   
                
                allSongplaces = response.data;
                res(response.data);
            }).catch((err) => {
                rej();
            });
        });
           
    }

    const handleGeolocationFail = (error) => {
        console.log("geoloc fail");
        if (error.code == error.PERMISSION_DENIED) {
            setstatuz(UNSUPPORTED);
        } else {
            setstatuz(FAIL);
        }
    }

    /**
     * Gets users current position and then calls function to order songplaces by position
     */
    const updatePosition = () => {
        console.log("updating position");
        navigator.geolocation.getCurrentPosition(handlePositionChange, handleGeolocationFail);
    }


    /**
     * Orders songplaces by proximity to given position 
     * @param position GeoLocationPosition (from navigator.geolocation.getCurrentPosition)
     */
     const handlePositionChange = (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;

        setLat(lat);
        setLong(long);

        getSongplaces()
        .then((songplaces) => {
            //sorts the songplaces according
            songplaces.sort(function(songplaceA, songplaceB) {
                let aDistance = calcDistance(songplaceA.latitude, songplaceA.longitude, lat, long);
                let bDistance = calcDistance(songplaceB.latitude, songplaceB.longitude, lat, long);
                return aDistance - bDistance;
            });     

            setDisplaySongplaces(songplaces);
        })
        .catch((error) => {
            console.log("get sps err");
            setstatuz(FAIL);
        });

        
    }

    /**
     * Plays (sorts songplaces) while autoplay is on. 
     * 
     * Gets user position. 
     */
    const trackPosition = () => {
        if (statuz === UNSUPPORTED || statuz === FAIL) {
            console.log("stops tracking pos");
            return;
        }

        updatePosition();  //function calls function to order songplaces

        setTimeout(trackPosition, 5000);  //calls this function again in 20 seconds
    }

    const tryAgain = () => {
        window.location.reload();
    }

    const autoPlay = () => {
        
    }

    const stopAutoPlay = () => {
        
    }

    //starts position tracking
    useEffect(() => {
        trackPosition();
    }, []);
    
    if (statuz === NONALLOWED) {
        return (
            <div className="margin-top">
                <h2>Location access must be allowed in browser</h2>
                <button onClick={() => tryAgain()}> Try again </button>
            </div>
        )
    }

    if (statuz === UNSUPPORTED) {
        return (
            <div className="margin-top">
                <h2>Browser does not support location</h2>
            </div>
        )
    } 

    if (statuz === FAIL) {
        return (
            <div className="margin-top">
                <h2>Sorry, could not get music by location.</h2>
                <button onClick={() => tryAgain()}> Try again </button>
            </div>
        )
    } 

    return (
        <div className="margin-top">
            <div>
                <h5>Music from: (  {lat}, {long} )</h5>
            </div>   
            <hr/>
            {
                displaySongplaces.map((songplace, index) => (
                    <ListedSongPlace id={songplace.id} trackId={songplace.track_id} isOwned={false} key={index}/>
                ))
            }
            <PlayBtn playFunction={autoPlay} pauseFunction={stopAutoPlay}/>
        </div>
    )
    
}

export default NearMe;