/**
 * Server handling/providing Spotify services for the client. 
 */
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const querystring = require('querystring');
var SpotifyWebApi = require('spotify-web-api-node');


var spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/login',
    clientId: process.env.SONGPLACER_CLIENT_ID,
    clientSecret: process.env.SONGPLACER_CLIENT_SECRET
});


const makeRandomString = (length) => {
    var result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


app.listen(3002, () => {
    console.log('Spotify server running on port 3002');
});


app.post('/login', (req, res) => {
    const code = req.body.code;

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            spotifyApi.setAccessToken(data.body.access_token);
            spotifyApi.setRefreshToken(data.body.refresh_token);
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in
            })
        })
        .catch(err => {
            console.log("authorize error: " + JSON.stringify(err));
            res.sendStatus(400);
        })
});


app.post("/refresh", (req, res) => {
    spotifyApi
    .refreshAccessToken()
    .then((result) => {

        console.log("expiresIn = " + result.body.expires_in);
        res.json({
            accessToken: result.body.access_token, 
            expiresIn: result.body.expires_in
        });
    })
        .catch((err) => {
        console.log("------------------------------------------------------------");
        console.log("------------------------------------------------------------");
        console.log("refresh error: " + err);
        res.sendStatus(400);
    });
});



app.get('/get-track-url/:trackId', (req, res) => {
    const trackId = req.params.trackId;
    console.log("getting track with id: " + trackId);
    console.log("request params: " + JSON.stringify(req.params));

    spotifyApi.getTrack(trackId)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        console.log("get track err: " + err)
    }) 
});


app.get('/get-user-data', (req, res) => {
    
});


