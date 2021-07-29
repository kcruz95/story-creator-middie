const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {
  // GET request to view storyteller page
  router.get("/", async(req, res) => {
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
    console.log('postContributionREQ:', req);
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
    const content = req.body.content;
    const storyId = req.body.storyId;
    const userId = req.session.userId;
    const contributions = {
      contributionId,
      userId,
      storyId,
      content,
    };
    console.log('postAcceptReq:', req);
    database.updateContributions(contributions).then((contributions) => {
      res.redirect("storyInProgress");
    });
  });
  return router;
};


/* REFERENCE
// POST request to edit short URL
app.post("/urls/:shortURL/edit", (req, res) => {
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;
  let currentUser = req.session["user_id"];

  // condition to deny access if no user is logged in
  if (currentUser === urlDatabase[shortURL].userID) {
    urlDatabase[shortURL].longURL = newURL;
  } else {
    return res
      .status(403)
      .send("You are not authorized to perform this action");
  }
  res.redirect("/urls");
});

// POST request to delete short url with delete button
app.post("/urls/:shortURL/delete", (req, res) => {
  let currentUser = req.session["user_id"];
  let userId = urlDatabase[req.params.shortURL].userID;

  // Condition to allow access only if user is logged in
  if (userId === currentUser) {
    const shortURL = req.params.shortURL;
    delete urlDatabase[shortURL];
    return res.redirect("/urls");
  } else {
    return res
      .status(401)
      .send("You are not authorized to perform this action");
  }
});
*/
