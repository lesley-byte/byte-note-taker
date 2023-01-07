const notes = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require("../helpers/fsUtils");

// GET Route for retrieving all the notes
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// GET Route for a specific note
notes.get("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  console.log(noteId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json("No note with that ID");
    });
});

// Delete route for a specific note
notes.delete("/:note_id", (req, res) => {
  const noteId = req.params.note_id;
  console.log("Request to delete note with ID: ", noteId);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      console.log("json: ", json);
      // delete the note with the id that matches the note_id in the url

      const result = json.filter((note) => note.id !== noteId);
      console.log("result: ", result);
      // Save that array to the filesystem
      writeToFile("./db/db.json", result);
      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// POST Route for a new note
notes.post("/", (req, res) => {
  console.info(
    `${req.method} request received to add a note--this is in the notes.js file`
  );

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, "./db/db.json");
    res.json(`Note added successfully 🚀`);
  } else {
    res.error("Error in adding note");
  }
});

module.exports = notes;
