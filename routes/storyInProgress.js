const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  router.get("/", async (req, res) => {
    const stories = await database.getAllStories();
    console.log(stories);
    res.render("storyInProgress", { stories: stories });
  });

//   // GET request to edit URL with the right user
// app.get("/urls/:shortURL", (req, res) => {
//   const shortURL = req.params.shortURL;

//   // Return error if link is not found
//   if (!urlDatabase[shortURL]) {
//     return res.status(404).send("Url not found");
//   }
//   let currentUser = req.session["user_id"];
//   let userId = urlDatabase[req.params.shortURL].userID;
//   if (userId === currentUser) {
//     const templateVars = {
//       shortURL: req.params.shortURL,
//       longURL: urlDatabase[req.params.shortURL].longURL,
//       userID: urlDatabase[req.params.shortURL].userID,
//       user: getUser(users, req.session["user_id"]),
//     };
//     return res.render("urls_show", templateVars);
//   } else {
//     return res
//       .status(404)
//       .send("You are not authorized to perform this action");
//   }
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
