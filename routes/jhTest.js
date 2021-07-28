/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const bcrypt = require('bcrypt');
// const database = require('database');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    return database.getUserWithEmail(email)
      .then(user => {
        if (bcrypt.compareSync(password, user.password)) {
          return user;
        }
        return null;
      });
  };
  exports.login = login;

  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });

  //logout
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  //getUserWithId
  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    database.getUserWithId(userId)
      .then(user => {
        if (!user) {
          res.send({error: "no user with that id"});
          return;
        }

        res.send({user: {name: user.name, email: user.email, id: userId}});
      })
      .catch(e => res.send(e));
  });


  //api.routes - reference
  //get stories
  router.get('/stories', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    // }database.getAllStories(req.query, 10)
    }database.getAllStories(userId)
      .then(stories => res.send({stories}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //get contributions
  router.get('/contributions', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    database.getAllContributions(userId)
      .then(contributions => res.send({contributions}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //add stories
  router.post('/stories', (req, res) => {
    const userId = req.session.userId;
    database.addStory({...req.body, userId})
      .then(story => {
        res.send(story);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //add contributions
  router.post('/contributions', (req, res) => {
    const userId = req.session.userId;
    database.addContribution({...req.body, userId})  //everything in req.body (spread operator)
      .then(contribution => {
        res.send(contribution);
      })
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  //get vote counts
  router.get('/contributions', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
    const contributionId = req.body.contribution_id;
    database.getVoteCount(contributionId)
      .then(votes => res.send({votes}))
      .catch(e => {
        console.error(e);
        res.send(e);
      });
  });

  return router;
};
