const express = require("express");
const path = require("path");
const { clog } = require("./middleware/clog");
const termData = require("./db/db.json");
const api = require("./routes/index.js");
const PORT = process.env.port || 3001;

const app = express();

app.use(clog);
const fs = require("fs");
console.log(__dirname);
// Sets up the Express app to handle data parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

app.use(express.static("public"));
// GET / should return the index.html file.
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
// GET /notes should return the notes.html file.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
// GET * should return the index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get("/api/notes", (req, res) => {
  console.log("getting api notes lesley-log🎉");
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log("parsed data: " + data);
      res.json(JSON.parse(data));
    }
  });
});

// `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client.
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note✨`);
  const { title, text } = req.body;
  if (title && text) {
    var newNote = {
      title,
      text,
    };
    fs.readFile("./db/db.json", "utf8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        fs.writeFile(
          "./db/db.json",
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info("Successfully updated notes!🥹")
        );
      }
    });
    console.log(newNote.title + " " + newNote.text + " " + "line 72🥹");
    res.json(`Note added successfully 🚀`);
    console.log("post api notes - line 74🥹");
  } else {
    res.json(`Error in adding note`);
    console.log("error in adding note - line 77");
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT} 🚀`);
});
