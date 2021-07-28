const express = require("express");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {

  // GET request to view storyteller page
  router.get("/", async (req, res) => {
    const stories = await database.getAllStories();
    console.log(stories);
    res.render("storyInProgress", { stories: stories });
  });
  // POST request to create NEW STORY
  router.post("/", (req, res) => {
  });

  router.post("/", (req, res) => {
    console.log('reqbody:', req.body);
    const content = req.body.content;
    const storyId = req.body.story_id;
    const userId = req.session.userId;
    const contribution = { userId, storyId, content };

    database.addContribution(contribution)
      .then((contribution) => {
        res.redirect("storyInProgress");
      });
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

for (let content in contributions) {
  <% contents[content]. %>

    contributions[contribution].content;

  console.log('contributor', contributor);
  console.log('contributors', contributors);
  console.log('stories', stories);

  // let status = '';
  // if (contributor !== null) {
  //   return status === accepted;
  // }
};

// contributors === creators_id
// returns
// contributor = index

// for (let contributors in stories) {
  // for (let contribution in contributions) {

  // }
// };
