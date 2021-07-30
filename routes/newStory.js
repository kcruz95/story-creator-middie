/*
 * All routes for newStory are defined here
 * Since this file is loaded in server.js into /newStory, these routes are mounted onto /newStory
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

// Imported helper functions
const database = require("./database");

module.exports = (db) => {

  // GET request to view newStory page
  router.get("/", (req, res) => {
    let userId = req.session.userId;
    if (userId) {

      // Render if an authorized user exists
      res.render("newStory");
    } else {

      // Render error and reject login if no authorized user exists
      return res.render("error");
    }

  });


  // POST request to create a new story with its title
  router.post("/", (req, res) => {
    const content = req.body.content;
    const userId = req.session.userId;
    const story = {
      creatorId: userId,
      title: content
    };

    // Send user back to homepage
    database.addStory(story)
      .then(() => {
        res.redirect("storyInProgress");
      });
  });

  return router;
};
