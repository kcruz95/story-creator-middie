const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  // router.get("/", async(req, res) => {
  //   const stories = await database.getAllStories();
  //   console.log(stories);
  //   res.render("storyShow", { stories: stories });
  // });

  router.get("/:id", async(req, res) => {
    const contributions = await database.getContributionsForStory(req.params.id);
    const story = await database.getAllStories();

    const templateVars = {
      contributions: contributions,
      story: story,
      userId: req.session.userId
    };
    console.log('storyShow.js');
    res.render("storyShow", templateVars);
  });


  //post request to add contribution
  router.post("/", (req, res) => {
    const content = req.body.content;
    const storyId = req.body.storyId;
    const userId = req.session.userId;
    const contribution = {
      userId,
      storyId,
      content
    };

    database.addContribution(contribution).then((contribution) => {
      res.redirect("storyInProgress");
    });
  });

  //In storyShow.js create a function where if accepted, add to the story.

  // creator of story can accept a contribution;
  //this merges it to the rest of the story

  // accept contribution and merge it on to the story
  router.post("/:id/accept", (req, res) => {
    // const contributionId = req.body.contributionsId;
    const contributionId = req.params.id;

    database.updateContributions(contributionId).then(() => {

      res.redirect("/storyInProgress");
    });
  });
  return router;
};
