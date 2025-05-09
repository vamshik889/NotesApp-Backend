const express = require("express");
const { NotesModel } = require("../models/NotesModel");

const notesRouter = express.Router();

notesRouter.post("/create", async (req, res) => {
  try {
    const note = new NotesModel(req.body);
    await note.save();
    res.status(200).send("notes has been created successfully");
  } catch (error) {
    console.log(error, "error in creating the notes");
    res.status(400).send({ message: "error in creating the notes" });
  }
});

// notesRouter.get("/notes",async(req,res)=>{

// })

notesRouter.patch("/update/:noteid", async (req, res) => {
  const { noteid } = req.params;
  const payload = req.body;

  if (noteid && payload) {
    await NotesModel.findOneAndUpdate({ _id: noteid }, payload);
    res
      .status(200)
      .send({ message: `note with id ${noteid} is updated successfully` });
  } else {
    res.status(400).send({ message: "please enter the valid note id" });
  }
});
notesRouter.delete("/delete/:noteid", async (req, res) => {
  const { noteid } = req.params;

  if (noteid) {
    await NotesModel.findOneAndDelete({ _id: noteid });
    res
      .status(200)
      .send({ message: `note with id ${noteid} is deleted successfully` });
  } else {
    res.status(400).send({ message: "please enter the valid note id" });
  }
});

notesRouter.get("/mynotes", async (req, res) => {
  const { authorId } = req.user;

  try {
    const notes = await NotesModel.find({ authorId });
    console.log(notes);
    if (notes.length === 0) {
      res
        .status(200)
        .send({ message: "there are no notes with the requested user" });
    } else {
      res.status(200).send({ notes: notes });
    }
  } catch (error) {
    console.log(error);
    res.send({ message: "no " });
  }
});

module.exports = {
  notesRouter,
};
