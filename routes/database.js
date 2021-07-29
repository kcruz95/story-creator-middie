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

/// get completedStories
const getCompletedStories = function(creatorId = null, limit = 10) {
  return pool
    .query(`SELECT s.*
            FROM stories s
            JOIN users u ON s.creatorId = u.id
            WHERE isCompleted = true
            `,)
    .then((result) => {

      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getCompletedStories = getCompletedStories;


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


const getAllStories = function(creatorId = null, limit = 10) {
  return pool
    .query(`SELECT s.*
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

const getStoryById = function (id) {

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

/// Stories

/**
 * Get all contributions for a single user.
 * @param {string} userId The id of the user.
 * @return {Promise<[{}]>} A promise to the contributions.
 */


const getAllContributions = function (userId, limit = 10) {
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

// const getContributionsForStory = function(userId, storyId, limit = 10) {
const getContributionsForStory = function(storyId) {
  return pool
    .query(`SELECT *
            FROM contributions c
            JOIN stories s ON c.storyId = s.id
            WHERE c.storyId = $1`, [storyId]

    /*LIMIT $3`, [userId, storyId, limit]*/)
    .then((result) => {
      //console.log()
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.getContributionsForStory = getContributionsForStory;

/*
WHERE c.userId = $1
AND c.storyId = $2
*/
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


//if accepted,
//attach contribution to story

//count votes per contribution
const getVoteCount = function (contributionId) {
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


const updateContributions = function(contributionId) {
  const sql1 = `UPDATE contributions SET status = 'accepted' WHERE id = $1 RETURNING *`;
  const sql2 = `UPDATE contributions SET status = 'rejected' WHERE id <> $1 AND storyid = $2`;

  return pool
    .query(sql1, [contributionId])
    .then((result) => {

      const record = result.rows[0];
      console.log('record:',record);
      console.log('[contributionId, record.storyId]:',[contributionId, record.storyid]);
      return pool.query(sql2, [contributionId, record.storyid]);

    })
    .catch((err) => {
      console.error(err.message);
    });
};
exports.updateContributions = updateContributions;


const updateStoryToComplete = function (storyId) {
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
