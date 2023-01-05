const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const termData = require('./db/db.json');

const PORT = process.env.port || 3001;

const app = express();

app.use(clog);
const fs = require('fs');
console.log(__dirname)
// Sets up the Express app to handle data parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));
// GET / should return the index.html file.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    }
);
// GET /notes should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
    }
);
// GET * should return the index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    }
);

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    if(req.body && req.body.title && req.body.text) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json({response});
        console.log("post api notes - line 48")
        } else {
            res.json(`error - no data received`);
    }
}
    );

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post('/api/notes', (req, res) => {
    let response;
    if(req.body && req.body.title && req.body.text) {
        response = {
            status: 'success',
            data: req.body,
        };
        res.json({response});
        console.log("post api notes - line 48")
        } else {
            res.json(`error - no data received`);
    fs.writeFile('./db/db.json', JSON.stringify(termData), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
        }
    );
}
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} 🚀`);
    }
);
