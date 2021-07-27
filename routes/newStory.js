const express = require("express");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {

  // GET request to view storyteller page
  router.get("/", (req, res) => {
    res.render("newStory");
  });

  // POST request to create NEW STORY
  router.post("/", (req, res) => {

    const content = req.body.content;
    const userId = req.session.userId;
    const story = {creator_id: userId,
      title: content}

    database.addStory(story)
    .then((story) => {
      res.redirect("storyInProgress");
    })

  })



  return router;
};
