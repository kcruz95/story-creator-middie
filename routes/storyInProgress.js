/*
 * All routes for storyInProgress are defined here
 * Since this file is loaded in server.js into /storyInProgress, these routes are mounted onto /storyInProgress
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Import helper functions
const database = require("./database");

module.exports = (db) => {

  // GET route to view home page
  router.get("/", async(req, res) => {

    // Use helper function to get all the story titles
    const stories = await database.getAllStories();

    const templateVars = {
      stories: stories,
      userId: req.session.userId
    };

    res.render("storyInProgress", templateVars);
  });

  // GET route to view the contributions made for a story
  router.get("/:id", async(req, res) => {
    const storyId = req.params.id;

    //Use helper function to find contribution by storyId
    const contributions = await database.getContributionsForStory(storyId);
    const story = await database.getStoryById(storyId);
    const userId = req.session.userId;

    const templateVars = { userId, contributions, story };

    return res.render("storyShow", templateVars);
  });


  //POST route to change the status of a story to completed
  router.post("/:id/complete", (req, res) => {
    const storyId = req.params.id;

    //Use helper function to change the boolean value of the isCompleted flag
    database.updateStoryToComplete(storyId).then(() => {
      res.redirect("/storyInProgress");
    });
  });


  //POST route to change the status of a contribution
  router.post("/:id/accept", (req, res) => {
    const contributionId = req.params.id;

    //Used helper function to change the status to accepted/rejected
    database.updateContributions(contributionId).then(() => {

      res.redirect("/storyInProgress");
    });
  });


  return router;
};
