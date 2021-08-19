/** This file contains database helper functions **/

// Connect to the database
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'sputtr'
});


/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = (email) => {
  return pool //return the whole promise to enable the .then fxn
    .query(`
      SELECT *
      FROM users
      WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0]; //return when the promise is resolved to enable the value inside .then
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};

exports.getUserWithEmail = getUserWithEmail;


/**
 * Get a single user from the database given their id.
 * @param {String} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithId = (id) => {
  return pool
    .query(`
      SELECT *
      FROM users
      WHERE id = $1`, [id])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, email: string, password: string}} user
 * @return {Promise<{}>} A promise to the user.
 */

const addUser = (user) => {
  return pool
    .query(
      `INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`, [user.name, user.email, user.password])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};

exports.addUser = addUser;


/// Stories

/**
 * Get all stories for a single user.
 * @return {Promise<[{}]>} A promise to the stories.
 */

const getAllStories = function() {
  return pool
    .query(`SELECT s.*
            FROM stories s
            JOIN users u ON s.creatorId = u.id
            `)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

exports.getAllStories = getAllStories;


/**
 * Get all completed stories.
 * @return {Promise<{}>} A promise to the completed stories.
 */
const getCompletedStories = function() {
  return pool
    .query(`SELECT s.*
            FROM stories s
            JOIN users u ON s.creatorId = u.id
            WHERE isCompleted = true
            `)
    .then((result) => {

      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

exports.getCompletedStories = getCompletedStories;

/**
 * Get a story by its id.
 * @return {Promise<{}>} A promise to the story.
 */

const getStoryById = function(id) {

  return pool
    .query(`SELECT *
            FROM stories s
            WHERE s.id = $1
            `, [id])
    .then((result) => {

      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getStoryById = getStoryById;

/**
 * Add a story to the database
 * @param {{}} story An object containing all of the property details.
 * @return {Promise<{}>} A promise to the story.
 */

const addStory = function(story) {
  return pool
    .query(
      `INSERT INTO stories (creatorId, title)
      VALUES ($1, $2)
      RETURNING *`, [story.creatorId, story.title])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};
exports.addStory = addStory;

/**
 * Update a story to the 'Completed' status
 * @param {Integer} storyId The id of the story.
 * @return {Promise<{}>} A promise to the story.
 */

const updateStoryToComplete = function(storyId) {
  return pool
    .query(`
    UPDATE stories
    SET isCompleted = TRUE
    WHERE id = $1`, [storyId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.updateStoryToComplete = updateStoryToComplete;


/// Contributions

/**
 * Get all contributions for a single user.
 * @return {Promise<[{}]>} A promise to the contributions.
 */

const getAllContributions = function() {
  return pool
    .query(`SELECT *
            FROM contributions c
            JOIN users u ON c.userId = u.id
            'pending'`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getAllContributions = getAllContributions;


/**
 * Get all contributions for a story.
 * @param {Integer} storyId The id of the story.
 * @return {Promise<{}>} A promise to the contributions.
 */

const getContributionsForStory = function(storyId) {
  return pool
    .query(`SELECT c.*
            FROM contributions c
            JOIN stories s ON c.storyId = s.id
            WHERE c.storyId = $1
            `, [storyId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getContributionsForStory = getContributionsForStory;


/**
 * Add a contribution to the database
 * @param {{}} contribution An object containing all of the property details.
 * @return {Promise<{}>} A promise to the contribution.
 */

const addContribution = function(contribution) {
  return pool
    .query(
      `INSERT INTO contributions (userId, storyId, content)
      VALUES ($1, $2, $3)
      RETURNING *`, [contribution.userId, contribution.storyId, contribution.content])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      return null;
    });
};
exports.addContribution = addContribution;

/**
 * Update a contribution to the 'accepted' or 'rejected' status.
 * @param {Integer} contributionId The id of the contribution.
 * @return {Promise<{}>} A promise to the contribution.
 */

const updateContributions = function(contributionId) {

  const sql1 = `UPDATE contributions SET status = 'accepted', updatedAt = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;
  const sql2 = `UPDATE contributions SET status = 'rejected', updatedAt = CURRENT_TIMESTAMP WHERE status <> 'accepted' AND id <> $1
  AND storyid = $2`;

  return pool
    .query(sql1, [contributionId])
    .then((result) => {

      const record = result.rows[0];
      return pool.query(sql2, [contributionId, record.storyid]);

    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.updateContributions = updateContributions;
