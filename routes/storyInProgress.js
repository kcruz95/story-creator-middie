const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  router.get("/", async (req, res) => {
    const stories = await database.getAllStories();

    const templateVars = {
      stories: stories,
      userId: req.session.userId
    };
    console.log('templateVars:',templateVars);
    res.render("storyInProgress", templateVars);
  });

  router.post("/", (req, res) => {
    const storyId = req.body.storyId;

    //database query
  });

  router.get("/:id", async (req, res) => {
    const storyId = req.params.id;
    console.log(req.session.userId);
    // const email = req.session.email;
    const contributions = await database.getContributionsForStory(storyId);
    const story = await database.getStoryById(storyId);
    const userId = req.session.userId;

    // const templateVars = { shortURL: urlID, longURL: urlDatabase[req.params.shortURL].longURL, user};
    const templateVars = { userId, contributions, story };
    console.log(templateVars);
    return res.render("storyShow", templateVars);
  });


  // post route to change status to complete
  router.post("/:id/complete", (req, res) => {
    const storyId = req.params.id;

    database.updateStoryToComplete(storyId).then(() => {
      res.redirect("/storyInProgress");
    });
  });

  router.post("/:id/accept", (req, res) => {
    // const contributionId = req.body.contributionsId;
    const contributionId = req.params.id;

    database.updateContributions(contributionId).then(() => {

      res.redirect("/storyInProgress");
    });
  });


  return router;
};
