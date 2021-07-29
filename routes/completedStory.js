const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const database = require("./database");

module.exports = (db) => {
   // GET request to view completed story page
   // SHows all completed story as well

   router.get("/", async (req, res) => {
    const stories = await database.getCompletedStories();

    res.render("completedStory", { stories: stories });
  });



  router.post('/', async (req, res) => {
    const storyId = req.params.id;

    // const email = req.session.email;
    const contributions = await database.getContributionsForStory(storyId);
    const story = await database.getStoryById(storyId);


    // const templateVars = { shortURL: urlID, longURL: urlDatabase[req.params.shortURL].longURL, user};
    const templateVars = { contributions, story };

    return res.render("storyShow", templateVars);
  })


  return router;
};
