/**
 * Server handling/providing Spotify services for the client. 
 */

const express = require('express');
const app = express();
app.use(express.json());


app.listen(3002, () => {
    console.log("Spotify server running on port 3002");
});


//todo get client_id and client_secret from environment variables 
app.get('/login', function(req, res) {

    var state = generateRandomString(16);
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
