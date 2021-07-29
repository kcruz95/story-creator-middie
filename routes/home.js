const express = require("express");
const router = express.Router();
const { Pool } = require("pg");
const database = require("./database");

module.exports = (db) => {
   // GET request to view completed story page
   // SHows all completed story as well

   router.get("/", async (req, res) => {
    const stories = await database.getAllStories();
    console.log('complete:',stories);
    res.render("home", { stories: stories });
  });

  return router;
};
