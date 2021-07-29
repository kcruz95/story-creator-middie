const express = require("express");
const router = express.Router();
const database = require("./database");

module.exports = (db) => {

  // GET request to view storyteller page
  router.get("/", (req, res) => {
    let userId = req.session.userId;
    if (userId) {
      res.render("newStory");
    } else {
      return res.render("error");
    }

  });

  // router.get('/stories', (req, res) => {
  //   const userId = req.session.userId;
  //   if (!userId) {
  //     res.error("💩");
  //     return;
  //   // }database.getAllStories(req.query, 10)
  //   }database.getAllStories(userId)
  //     .then(stories => res.send({stories}))
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });

  // app.get("/urls", (req, res) => {
  //   let currentUser = req.session["user_id"];
  //   let userUrl = {};

  //   // Only allows signed in user to view their own URL
  //   for (const short in urlDatabase) {
  //     if (urlDatabase[short].userID === currentUser) {
  //       userUrl[short] = urlDatabase[short].longURL;
  //     } else if (!currentUser) {
  //       // Return error when no user is logged in
  //       return res.status(403).send("unauthorized access");
  //     }
  //   }
  //   const templateVars = {
  //     urls: userUrl,
  //     user: getUser(users, req.session["user_id"]),
  //   };
  //   res.render("urls_index", templateVars);
  // });


  // POST request to create NEW STORY
  router.post("/", (req, res) => {
    const content = req.body.content;
    const userId = req.session.userId;
    const story = {
      creatorId: userId,
      title: content
    };

    database.addStory(story)
      .then((story) => {
        res.redirect("storyInProgress");
      });
  });

  // POST request to create NEW STORY
  // router.post('/stories', (req, res) => {
  //   const userId = req.session.userId;
  //   database.addStory({...req.body, userId})
  //     .then(story => {
  //       res.send(story);
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       res.send(e);
  //     });
  // });
  return router;
};
