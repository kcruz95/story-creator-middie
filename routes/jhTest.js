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
    // const userId = req.session.userId;
    // if (!userId) {
    res.send({message: "not logged in"});
    return;
  // });
  });
  return router;
};
