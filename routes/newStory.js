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
      });
  });
  //   database.addStory(story)
  //     .then((story) => {
  //       res.redirect("storyInProgress");
  //     });

  // })


  // POST request to create NEW STORY
  router.post('/stories', (req, res) => {
    const userId = req.session.userId;
    database.addStory({...req.body, userId})
      .then(story => {
        res.send(story);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });
  return router;
};
