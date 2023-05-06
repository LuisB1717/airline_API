const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

async function doQuery(query, params) {
  const result = await new Promise((resolve, reject) => {
    pool.query(query, params, function (error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });

  return result;
}

module.exports = { doQuery };
