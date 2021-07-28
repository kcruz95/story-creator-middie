// connect to the database

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
    .query(`SELECT *
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
 * @param {string} id The id of the user.
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
 * @param {{name: string, password: string, email: string}} user
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
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */


<<<<<<< HEAD
const getAllStories = function (creator_id = null, limit = 10) {
=======
const getAllStories = function(creatorId = null, limit = 10) {
>>>>>>> 3d934b8d61088823da8c3c3b445fd76f809ed39d
  return pool
    .query(`SELECT *
            FROM stories s
            JOIN users u ON s.creatorId = u.id
            `,)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getAllStories = getAllStories;

/// Stories

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */


<<<<<<< HEAD
const getAllContributions = function (user_id, limit = 10) {
=======
const getAllContributions = function(userId, limit = 10) {
>>>>>>> 3d934b8d61088823da8c3c3b445fd76f809ed39d
  return pool
    .query(`SELECT *
            FROM contributions c
            JOIN users u ON c.userId = u.id`
            /*WHERE c.userId = $1 LIMIT $2`, [userId, limit]*/)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getAllContributions = getAllContributions;

<<<<<<< HEAD
const getContributionsForStory = function (user_id, story_id, limit = 10) {
  return pool
    .query(`SELECT *
            FROM contributions c
            JOIN users u ON c.user_id = u.id
            JOIN stories s ON c.story_id = s.id
            WHERE c.user_id = $1
            AND c.story_id = $2
            LIMIT $2`, [user_id, story_id, limit])
=======
const getContributionsForStory = function(userId, storyId, limit = 10) {
  return pool
    .query(`SELECT *
            FROM contributions c
            JOIN users u ON c.userId = u.id
            JOIN stories s ON c.storyId = s.id
            WHERE c.userId = $1
            AND c.storyId = $2
            LIMIT $3`, [userId, storyId, limit])
>>>>>>> 3d934b8d61088823da8c3c3b445fd76f809ed39d
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getContributionsForStory = getContributionsForStory;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

/*
const getContributionsForStory = function(storyId, limit = 20) { //should there be a limit
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT s.id, c.*
  FROM stories s
  JOIN contributions c ON s.id = c.storyId
  WHERE s.id = $1
  GROUP BY s.id
  ORDER BY c.sequence
  `;
  // 3
  if (options.contributionId) {
    queryParams.push(`${options.content}`);
    queryString += `AND city LIKE $${queryParams.length} `;
  }
  if (status === 'accepted') {
    `
    UPDATE contributions
    SET sequence =
    `
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;
*/

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */


const addStory = function (story) {
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


const addContribution = function (contribution) {
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


//if accepted,
//attach contribution to story

//count votes per contribution
<<<<<<< HEAD
const getVoteCount = function (contribution_id) {
=======
const getVoteCount = function(contributionId) {
>>>>>>> 3d934b8d61088823da8c3c3b445fd76f809ed39d
  return pool
    .query(`
    SELECT c.id, count(v.id)
    FROM contributions c
    LEFT JOIN votes v ON c.id = v.contributionId
    WHERE c.id = $1
    GROUP BY c.id`, [contributionId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getVoteCount = getVoteCount;


const updateContribution = function(contributionId) {
  return pool
    .query(`
    UPDATE contributions
    SET status = 'accepted'
    FROM contributions c
    JOIN stories s ON c.storyId = s.id
    WHERE id = $1;

    UPDATE contributions
    SET status = 'denied'
    FROM contributions c
    JOIN stories s ON c.storyId = s.id
    WHERE id <> $1`, [contributionId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.updateContribution = updateContribution;
