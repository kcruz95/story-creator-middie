const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {
  //GET request to view storyShow page
  router.get("/", async(req, res) => {
    const stories = await database.getAllStories();

    res.render("storyShow", { stories: stories });
  });

  // router.get("/:id", async (req, res) => {
  //   const contributions = await database.getContributionsForStory(req.params.id);
  //   const story = await database.getAllStories();

  //   const templateVars = {
  //     contributions: contributions,
  //     story: story,
  //     userId: req.session.userId
  //   };

  //   res.render("storyShow", templateVars);
  // });

  // post request to add contribution
router.post("/", (req, res) => {
  const content = req.body.content;
  const storyId = req.body.storyId;
  const userId = req.session.userId;
  const contribution = {
    userId,
    storyId,
    content,
  };

  database.addContribution(contribution).then((contribution) => {
    res.redirect("storyInProgress");
  });
});

  return router;
};
