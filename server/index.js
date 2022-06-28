const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root', 
    password: '',
    host: 'localhost', 
    database: 'songplacer', 
});



/*-----------------------------------------------------

    ROUTES 



-------------------------------------------------------*/


/**
 * Verify user and return token. 
 * (For some reason get-routing request body could not be read when doing get-routing) 
 */
 app.post('/verify-user', (req, res) => {
    
    const userName = req.body.userName;
    const password = req.body.password;
    
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', 
        [userName, password], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Verify user error"
                })
            } else {

                //if no user with credentials found: return bad request
                if (result.length == 0) {
                    return res.status(400).json({
                        message: "Invalid username and password combination."
                    });
                }
                
                return res.status(200).json({
                    token: "testtoken", 
                    userId: result[0]?.id
                });
            }
        });
});



/**
 * Tell if user owns playlist with ownership: true/or false. 
 */
 app.post('/verify-playlist-ownership', (req, res) => {
    
    const userId = req.body.userId;
    const playlistId = req.body.playlistId;

    const checkQuery = "SELECT * FROM playlists " + 
                        "WHERE user_id = ? AND id = ?";
    db.query(checkQuery, 
        [userId, playlistId], (err, result) => {
            if (err) {
                console.log("verify err: " + err);
                return res.status(500).json({
                    message: "Could not verify playlist ownership"
                });
            }

            if (result.length > 0) {
                return res.status(200).json({
                    ownership: true
                });
            }

            return res.status(200).json({
                ownership: false
            });
        });
});

/**
 * Get all users
 */
app.get('/get-users', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Could not get users"
            });
        }

        return res.status(200).json(result);
    });
});


/**
 * Get username by id
 */
 app.get('/get-username/:userId', (req, res) => {

    const userId = req.params.userId;

    db.query("SELECT username FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Could not get users"
            });
        }

        return res.status(200).json(result);
    });
});




/**
 * Post a new user, or fails to do so and returns a response indicating why. 
 */
 app.post('/create-user', (req, res) => {
    
    const userName = req.body.userName;
    const password = req.body.password;

    //check that username is valid
    if (userName == null || userName === "") {
        return res.status(400).json({
            message: "Username can not be empty"
        });
    }

    //check that password is valid
    if (password == null || password === "") {
        return res.status(400).json({
            message: "Password can not be empty"
        });
    }
     
    //check that username is unique
    db.query('SELECT * FROM users WHERE username = ?', 
        [userName], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Create user error"
                });
            } 

            if (result.length > 0) {
                return res.status(422).json({
                    message: "Username already taken"
                });
            }
            
        }); 
    

    //post the user
    db.query('INSERT INTO users (username, password) VALUES (?,?)', 
        [userName, password], (err, result) => {
            if (err) {
                console.log("create user error: " + err);
                return res.status(500).json({
                    message: "Create user error"
                });
            } 

            return res.status(200).json();
        });
});



/**
 * Post a new playlist. 
 */
 app.post('/library/:userId/create-playlist', (req, res) => {
    
    const userId = req.params.userId;
    const playlistName = req.body.playlistName;

    console.log("posting playlist " + playlistName + " to user " + userId);

    if (userId == null) {
        return res.status(400).json({
            message: "No user-id for playlist"
        });
    }

    if (playlistName == null || playlistName === "") {
        return res.status(400).json({
            message: "Playlist name cannot be empty"
        });
    }

    db.query(
        'INSERT INTO playlists (user_id, name) VALUES (?,?)', 
        [userId, playlistName], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Create playlist error"
                });
            } 

            return res.status(200).json({
                message: "Playlist posted"
            });
        });
});

/**
 * Update a playlist name. 
 */
app.put("/library/:userId/update-playlist/:playlistId", (req, res) => {

    const userId = req.params.userId;
    const playlistId = req.params.playlistId;
    const playlistName = req.body.playlistName;

    //check that playlist name not empty
    if (playlistName == null || playlistName === "") {
        return res.status(400).json({
            message: "Playlist name cannot be empty"
        });
    }

    //update playlist name
    db.query(
        "UPDATE playlists SET name = ? WHERE id = ?",
        [playlistName, playlistId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Playlist update error"
                });
            } 

            return res.status(200).json({
                message: "Playlist updated"
            });
        });
});

/**
 * Delete a playlist. 
 */
 app.delete("/library/:userId/delete-playlist/:playlistId", (req, res) => {

    const playlistId = req.params.playlistId;
    console.log("deleting playlist " + playlistId);

    //check that playlist name not empty
    if (playlistId == null || playlistId === "") {
        return res.status(400).json({
            message: "Playlist id cannot be empty"
        });
    }

    //delete playlist
    db.query(
        "DELETE FROM playlists WHERE id = ?",
        [playlistId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Playlist delete error"
                });
            } 

            return res.status(200).json({
                message: "Playlist deleted"
            });
        });
});



/**
 * Get playlists for a user.   
 */
 app.get('/library/:userId', (req, res) => {
    
    const userId = req.params.userId;

    console.log("getting library for userId: " + userId);

    db.query('SELECT * FROM playlists WHERE user_id = ?', 
        [userId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Get playlists error"
                });
            } 

            return res.status(200).json(result);
        });
});

/**
 * Get playlist by id. 
 */
app.get('/get-playlist/:playlistId', (req, res) => {
    const playlistId = req.params.playlistId;

    db.query('SELECT * FROM playlists WHERE id = ?', 
        [playlistId], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Get playlist error"
                });
            } 

            return res.status(200).json(result);
        });
});


/**
 * Post a new songplace to a playlist. 
 */
 app.post('/library/:userId/:playlistId/create-songplace', (req, res) => {
    
    let songplaceId;    //get from songplace post

    const userId = req.params.userId;
    const playlistId = req.params.playlistId;
    const songplaceName = req.body.songplaceName;
    const longitude = req.body.longitude;
    const latitude = req.body.latitude;

    if (userId == null) {
        return res.status(400).json({
            message: "User id must not be null"
        });
    }

    if (playlistId == null) {
        return res.status(400).json({
            message: "Playlist id must not be null"
        });
    }

    //post songplace to songplaces
    db.query(
        'INSERT INTO songplaces (user_id, name, latitude, longitude) VALUES (?,?,?,?)', 
        [userId, songplaceName, latitude, longitude], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Create songplace error"
                });
            }

            
            if (result.insertId == null) {
                return res.status(500).json({
                    message: "Cannot add songplace to playlist"
                });
            }

            db.query('INSERT INTO playlist_details (playlist_id, songplace_id) VALUES (?,?)', 
                [playlistId, result.insertId], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Add songplace to playlist error"
                    });
                } else {
                    return res.status(200).json(result);
                }
        });
    });
});


/**
 * Get songplaces for playlist. 
 */
app.get('/library/:userId/:playlistId/songplaces', (req, res) => {

    const playlistId = req.params.playlistId;
    
    db.query("SELECT * FROM songplaces " + 
            "WHERE id IN ( " +
            "SELECT songplace_id FROM playlist_details " +
            "WHERE playlist_id = ?)", [playlistId], 
        (err, result) => {
        if (err) {
            console.log("get songplaces error: " + err);
            return res.status(500).json({
                message: "Get playlists error"
            });
        } 
        return res.status(200).json(result);
    });

});


/**
 * Delete songplace.
 */
app.delete('/library/:userId/:playlistId/:songplaceId/delete-songplace', (req, res) => {

    const songplaceId = req.params.songplaceId;

    db.query("DELETE FROM songplaces " + 
            "WHERE id = ?", [songplaceId], 
        (err, result) => {
        if (err) {
            console.log("delete songplaces error: " + err);
            return res.status(500).json({
                message: "Delete songplace error"
            });
        } 
        return res.status(200).json({
            message: "Songplace deleted"
        });
    });
});


/**
 * Get all songplaces
 */
 app.get('/get-songplaces', (req, res) => {

    db.query("SELECT * FROM songplaces", 
        (err, result) => {
        if (err) {
            console.log("get songplaces error: " + err);
            return res.status(500).json({
                message: "Get songplace error"
            });
        } 
        return res.status(200).json(result);
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});