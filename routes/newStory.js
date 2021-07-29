const express = require("express");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {

  // GET request to view storyteller page
  router.get("/", (req, res) => {
    let userId = req.session.userId;
    if (userId) {
      res.render("newStory");
    } else {
      return res.render("error");
    }

  });


  // POST request to create NEW STORY
  router.post("/", (req, res) => {
    const content = req.body.content;
    const userId = req.session.userId;
    const story = {
      creatorId: userId,
      title: content
    };

    database.addStory(story)
      .then((story) => {
        res.redirect("storyInProgress");
      });
  });

  return router;
};
