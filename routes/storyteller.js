const express = require("express");
const router = express.Router();

module.exports = (db, database) => {

  // GET request to view storyteller page
  router.get("/", (req, res) => {
    res.render("storyteller");
  });

  // POST request to create NEW STORY
  router.post("/", (req, res) => {

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

  --------------------------------

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
