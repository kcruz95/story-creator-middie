const express = require("express");
const router = express.Router();
const database = require("./database");

// imported helper functions

module.exports = (db) => {
  // GET back the view for login page
  router.get("/", (req, res) => {
    //console.log("rohit testing login");
    res.render("login");
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(401).send("incorrect user or pass");
    }

    // db.query(`SELECT *FROM users WHERE email = $1`, [email]).then((result) => {
    //   const user = result.rows[0];

    database.getUserWithEmail(email).then((user) => {
      if (!user || user.password !== password) {
        res.status(401).send("incorrect user or pass");
      }
      req.session.userId = user.id;

      res.redirect("/newStory");
    });
  });

  // POST request to logut by setting cookie to NULL
  router.post("/logout", (req, res) => {
    req.session = null;

    // Redirects back to homepage
    res.redirect("/");
  });

  return router;
};
