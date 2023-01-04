const express = require('express');
const path = require('path');
const termData = require('./db/db.json');
const PORT = 3001;
const app = express();
const fs = require('fs');
console.log(__dirname)
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// GET / should return the index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log("get slash - line 16")
    }
);
// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    console.log("get notes - line 22")
    }
);
// GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    console.log("get * - line 28")
    }
);

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    res.json(termData);
    console.log("get api notes - line 35")
    }
    );

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newNote = (req.body);
    console.log(req.body);
    console.log(newNote + " - line 45");
    // We then add the json the user sent to json
    termData.push(newNote);
    // We then display the JSON to the users
    res.json(newNote);
    console.log("post api notes - line 50")
    // write to db.json using fs
    fs.writeFile('./db/db.json', JSON.stringify(termData), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        }
    );
    }
);


app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
    }
);
//
// Compare this snippet from 11-Express\01-Activities\08-Ins_POST-Fetch\server.js:
// const express = require('express');
// const path = require('path');
// const termData = require('./db/terms.json');
// const PORT = 3001;
//
