// Load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use
app.use(morgan("dev"));

// Use cookie-session as a middleware to manage user sessions
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"]
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);
app.use(express.static("public"));


// Separate routes for each resource - refer to each route file under routes folder
const loginRoutes = require("./routes/login");
const newStory = require("./routes/newStory");
const storyInProgress = require("./routes/storyInProgress");
const storyShow = require("./routes/storyShow");


// Mount all resource routes
app.use("/login", loginRoutes(db));
app.use("/newStory", newStory(db));
app.use("/storyInProgress", storyInProgress(db));
app.use("/storyShow", storyShow(db));
// app.use("/error", loginRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

// POST request to logout by setting cookie to NULL
app.post("/logout", (req, res) => {

  req.session = null;

  // Redirect back to homepage
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
