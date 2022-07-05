## Localstorage
- <code>songplace_token</code> Token received when user logs in with Songplacer-account
- <code>access_token</code> Access token from Spotify 
- <code>user_id</code> Current users Songplacer-id

## Env variables
- <code>REDIRECT_URI</code> where to redirect after Spotify token received/refreshed
- <code>SONGPLACER_CLIENT_ID</code> Spotify client id
- <code>SONGPLACER_CLIENT_SECRET</code> Spotify client secret


## Database
See database/DATABASE.md

## Other
If no playlist is not given when adding songplace, it is added to users default playlist 'default'. 
The default playlists should be created if user adds songplace to no specific playlist and has no default
playlist. 