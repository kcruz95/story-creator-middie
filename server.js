// load .env data into process.env
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
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Using cookie-session as a middleware to manager user sessions
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
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

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above

const users = {
  user: {
    id: "user",
    email: "user@gmail.com",
    password: "1234",
  },
};

const findEmail = (email) => {
  for (const userId in users) {
    const user = users[userId];
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
}); // fix app post later

app.get("/login", (req, res) => {

  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/login", (req,res) => {
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

app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).send(('sign up incomplete'));
  }
  const user = findEMail(email);
  if(user) {
    res.status(400).send('user exist');
  }
  const id = Math.floor(Math.random() = 1000) + 1;

  users[id] = {
    id,
    email,
    password
  };
  req.session.userId = users[id].id;
  res.redirect('/'); // fix app post later
})

// POST request to logut by setting cookie to NULL
app.post("/logout", (req, res) => {
  req.session = null;

  // Redirects back to homepage
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
