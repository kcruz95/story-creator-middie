/*
 * All routes for storyShow are defined here
 * Since this file is loaded in server.js into api/users, these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const { Pool } = require("pg");
const router = express.Router();

// Imported helper functions
const database = require("./database");

module.exports = (db) => {

  //GET route to get contributions relating to a story
  router.get("/:id", async(req, res) => {

    //Use helper function to find contribution by storyId
    const contributions = await database.getContributionsForStory(req.params.id);
    const story = await database.getAllStories();

    const templateVars = {
      contributions: contributions,
      story: story,
      userId: req.session.userId
    };
    res.render("storyShow", templateVars);
  });


  //POST route to add a contribution to an existing story
  router.post("/", (req, res) => {
    const content = req.body.content;
    const storyId = req.body.storyId;
    const userId = req.session.userId;
    const contribution = {
      userId,
      storyId,
      content
    };

    //Use helper function to add a contribution via storyId
    database.addContribution(contribution).then(() => {
      res.redirect("storyInProgress");
    });
  });

  return router;
};
