const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    "author":String,
    "title":String,
    "body":String,
    "category":String,
    "authorId":String
});

const NotesModel = mongoose.model("notes",noteSchema);

module.exports = {
    NotesModel
}