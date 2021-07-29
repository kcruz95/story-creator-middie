const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  router.get("/", async (req, res) => {
    const stories = await database.getAllStories();

    res.render("storyInProgress", { stories: stories });
  });

  router.post("/", (req, res) => {
    const storyId = req.body.storyId;

    //database query
  });

  router.get("/:id", async (req, res) => {
    const storyId = req.params.id;

    // const email = req.session.email;
    const contributions = await database.getContributionsForStory(storyId);
    const story = await database.getStoryById(storyId);

    // const templateVars = { shortURL: urlID, longURL: urlDatabase[req.params.shortURL].longURL, user};
    const templateVars = { contributions, story };

    return res.render("storyShow", templateVars);
  });


  // accept contribution and merge it on to the story
  router.post("/:id/complete", (req, res) => {
    // const contributionId = req.body.contributionsId;
    const storyId = req.params.storyId;
    const title = req.body.title;
    const userId = req.session.userId;
    const stories = {
      userId,
      storyId,
      title
    };
    console.log('postAcceptReq:', req);
    database.updateStoryToComplete(stories).then((stories) => {
      res.redirect("completedStory");
    });
  });


  return router;
};
