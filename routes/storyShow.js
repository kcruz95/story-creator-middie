const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  router.get("/", async (req, res) => {
    const stories = await database.getAllStories();
    console.log(stories);
    res.render("storyShow", { stories: stories });
  });


  //post request to add contribution
  router.post("/", (req, res) => {
    const content = req.body.content;
    const storyId = req.body.storyId;
    const userId = req.session.userId;
    const contribution = {
      userId,
      storyId,
      content,
    };
    console.log('contributionREQ:', req);
    database.addContribution(contribution).then((contribution) => {
      res.redirect("storyInProgress");
    });
  });



  // creator of story can accept a contribution;
  //this merges it to the rest of the story

  // accept contribution and merge it on to the story
  router.post("/accept", (req, res) => {
    const contributionid = req.body.contributionsid;
    return pool.query(
      `UPDATE contributions set status = "accepted" where id = ${contributionid}`
    );
     res.redirect("/storyInProgress");
  });

  return router;
}
