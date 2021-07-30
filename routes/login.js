/*
 * All routes for Login are defined here
 * Since this file is loaded in server.js into /login, these routes are mounted onto /login
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const { Pool } = require("pg");

// Import helper functions
const database = require("./database");

module.exports = (db) => {

  // GET route to view login page
  router.get("/", (req, res) => {

    res.render("login");
  });

  // POST route to check credentials
  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Render to error page if user is not authorized
    if (!email || !password) {
      res.render("error");
    }

    database.getUserWithEmail(email).then((user) => {
      if (!user || user.password !== password) {
        res.render("error");
      }

      // Redirect to home page with a matching user
      req.session.userId = user.id;

      res.redirect("/storyInProgress");
    });
  });

  // POST request to logout by setting cookie to NULL
router.post("/logout", (req, res) => {

  req.session = null;

  // Redirect back to homepage
  res.redirect("/");
});


  return router;
};
