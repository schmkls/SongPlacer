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

app.listen(3001, () => {
    console.log("Server running on port 3001");
});



/*-----------------------------------------------------

    ROUTES 

-------------------------------------------------------*/





