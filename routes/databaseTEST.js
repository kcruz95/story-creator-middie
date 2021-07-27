const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'sputtr'
});

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
