# SongPlacer
Explore songs through places

## User/developer guide
Requierements:
* node 
* npm
* MYSQL
* correct environment variables, see [documentation](https://github.com/schmkls/SongPlacer/blob/main/documentation.md)

Start the server 
<code>
    cd server
    node index.js
</code>

Start the spotify_server 
<code>
    cd spotify_server
    node index.js
</code>

Start the client/frontend
<code>
    cd frontend
    npm install
    npm start
</code>

Go to <code>http://localhost:3000/</code> and the application should appear. 


## Prototype
[Prototype in Figma](https://www.figma.com/proto/GMXkqlo1kXkc7yVs8LngPi/SongPlacer?node-id=268%3A661&scaling=scale-down&page-id=0%3A1&starting-point-node-id=268%3A661&show-proto-sidebar=1)


## Vision
SongPlacer will be a website enabling people to connect and explore music with places. It can be used for exploring local music, exploring what music
is unique or popular at different places, explore what type of music other people connect to places, and sorting/storing the music you have connected 
with places. 

The app should be easy to use and there will be enough users and user generated content to explore local music for a roadtrip. There will also be some automatically generated content, playlists like "This is CityX" containing music from CityX.

After the summer 22 there will be a version that at least supports users to add music and use the *Near me*-function.  

## Example of users
- **Roadtrippers**. People who travel and want to explore local music can do so by using the *Near me*-function and choosing *Unique* over *Popular*,
to get music that is unique for the places they pass. 

- **Musical explorers**. People who from home explores music through the map in the *Explore*-view. 

- **Nostalgics**. People who have memories of places connected to music and want to relive those places by listening to the music can do so by 
storing their song-places in playlists in their *Library*.

- **Connectors**. People who connect places to music and want to connect with how other people connect places to music. For example, users can connect 
songs to forests to represent the vibe of the forest. Other users might connect the skate-park in Ume?? with Fricky, R??sunda with "?? vi e AIK", or a Paris 
square with "Lobo-Hombre En Paris".  

Read more user stories in: [exampleUsers.md](https://github.com/schmkls/SongPlacer/blob/main/exampleUsers.md)


## Similar apps + what they lack
- [Roadtrip Mixtape](https://developer.spotify.com/community/showcase/roadtrip-mixtape/) Content is not user generated, does not seem to be maintained. 
- [MusicMapper](https://thenextweb.com/news/musicmapper-app-is-for-music-loving-geo-location-fanatics) Lacks functionality to play, queue, create playlists. 
Not maintained?
- [Spotify prototype](https://bootcamp.uxdesign.cc/ui-case-study-discover-local-artists-with-spotify-local-scene-92f11c39edae) Seems to be more about 
exploring artists by city. 
- [MusicPlaces](https://musicplaces.org/es) Seems to be more about historical music. Also seems like contributors and users are separated. 
- [GeoTunes](https://github.com/kainan54/Mod4-project-geoTunes) Only supports routes with associated playlists (does not use user location). GeoMusica will eventually have similiar functionality by sharing *Playlist*s, except for that your location will determine what song will be played. 
- [GeoMusic](https://github.com/soo-park/geomusic) Only supports playlist one playlist at a time by location. 
- [Music Where You Are](https://www.musicwhereyouare.com/) Not user generated content. 
- [Soundtrckr](https://www.wired.com/2009/12/soundtrckr-is-spot-on-like-a-location-aware-pandora/) From 2009, geotagging songs, had notifications. 

## Contribute 
Contributions are much appreciated! You can contribute by:
- Giving feedback to mickels.martin@gmail.com
- Creating feature branches and developing features

## Todos
* play from Near me
* db: trigger so delete user deletes users playlists'
* fix spotify token refresh
* map
* safe login
* API: verify user when editing library
* read and make sure Spotify guidelines and TOS is followed

## Ideas
* Some type of automatic retrieving/adding of songplaces from users listening history or currently playing song



