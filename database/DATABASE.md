# ER-diagram
See ER-diagram at [ER-diagram](https://git.cs.umu.se/dv20mms/crud/-/blob/main/database/ER%20diagram). 

# Database
A local MYSQL-database is used for the app. Connection to the database is established in the *index.js*-file in the server. 
  * user: 'root'
  * password: ''
  * host: 'localhost'
  * database: 'songplacer'


# How to create database and explanation of tables
<code>
CREATE SCHEMA `songplacer` ;
</code>
<br />
<br />

Stores users and their credentials. Credentials are NOT NULL because a user must have some username to display and password to verify him/her-self with. 
<code>
CREATE TABLE `songplacer`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` TEXT(255) NOT NULL,
  `password` TEXT(255) NOT NULL,
  PRIMARY KEY (`id`));
</code>
<br />
<br />

Stores relations between playlists and songplaces, ie. which playlist a songplace may belong to. 
<code>
CREATE TABLE `songplacer`.`playlist_details` (
  `songplace_id` INT NOT NULL,
  `playlist_id` INT NOT NULL);
</code>
<br />
<br />

Stores playlists. Playlists must have a user. 
<code>
CREATE TABLE `songplacer`.`playlists` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(255) NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`id`));
</code>
<br />
<br />

Stores songplaces. A songplace is a place (latitude + longitude) with a song that some user has added. 
<code>
CREATE TABLE `songplacer`.`songplaces` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT(255) NOT NULL,
  `user_id` INT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `latitude` FLOAT NOT NULL,
  PRIMARY KEY (`id`));
</code>
<br />
<br />

Trigger that deletes playlist_details when playlists are deleted. 
<code>
CREATE TRIGGER playlist_delete
BEFORE DELETE
ON playlists FOR EACH ROW 
	DELETE FROM playlist_details
	WHERE playlist_id = OLD.id
</code>
<br />
<br />

Trigger that deletes songplaces when playlist_details are deleted (so that songplaces cannot exist if the playlist they were in is deleted). 
<code>
CREATE TRIGGER songplace_delete
BEFORE DELETE
ON playlist_details FOR EACH ROW 
	DELETE FROM songplaces
	WHERE id = OLD.songplace_id
</code>
<br />
<br />
