/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then((data) => {
        const users = data.rows;
        res.json({ users });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
      router.post("/login", (req,res) => {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) {
          res.status(401).send(('incorrect user or pass'));
        }
        const user = findEmail(email);
        if(!user || user.password !== password) {
          res.status(401).send('incorrect user or pass');
        }
        req.session.userId = user.id;
        res.redirect('/'); // redirect to main page change later

      });
  });
  return router;
};

