require('dotenv').config();
const pgp = require('pg-promise')();

const connection = {
  host: 'db',  // Name of the service defined in docker-compose
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
};

const db = pgp(connection);

module.exports = db;
