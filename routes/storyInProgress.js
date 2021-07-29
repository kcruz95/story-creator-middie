const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {


  //GET request to view storyteller page
  router.get("/", async(req, res) => {
    const stories = await database.getAllStories();

    res.render("storyInProgress", {stories: stories
    });
  });

  // router.get("/", async(req, res) => {
  //   //const stories = await database.getAllStories();
  //   const contributions = await database.getContributionsForStory();
  //   //console.log(stories);
  //   console.log(contributions);
  //   res.render("storyInProgress", {contributions
  //   });
  // });


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

    router.post("/accept", (req, res) => {
    const contributionid = req.body.contributionsid;
    return pool.query(
      `UPDATE contributions set status = "accepted" where id = ${contributionid}`
    );
     res.redirect("/storyInProgress");
  });


  /*
  ADD STORY
  story teller route:
  get back wat is typed into textbook for creating new story
  and adding into the database for contribution under user's account

  ADD CONTRIBUTION
  contribution to story route:
  user can contribute text to story in progress

  VIEW CURRENT CONTRIBUTION
  user can view current contribution but not accept them
  users can up vote contribution

  UP COUNT:
  when upvoted like values goes up

  ADD CONTRIBUTION TO STORY
  owner of story can accept contribution to story

  COMPLETE STORY
  OWNER of story can submit current story as completed
  and be viewed on completed story list


  */
  return router;
};
