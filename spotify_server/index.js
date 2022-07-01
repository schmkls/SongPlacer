/**
 * Server handling/providing Spotify services for the client. 
 */
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


const makeRandomString = (length) => {
    var result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


//environment variables
//https://medium.com/codait/environment-variables-or-keeping-your-secrets-secret-in-a-node-js-app-99019dfff716
//https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
const client_id = process.env.SONGPLACER_CLIENT_ID;
const client_secret = process.env.SONGPLACER_CLIENT_SECRET;

const redirect_uri = "http://localhost:3000/near-me";

app.listen(3002, () => {
    console.log("Spotify server running on port 3002");
});


app.get('/login', function(req, res) {

    console.log("trying to login");

    var state = makeRandomString(16);
    var scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });
