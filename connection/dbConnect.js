'use strict';

require('dotenv').config();
const Pool = require('pg-pool');

const config = {
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
};

const db = new Pool(config);

module.exports = db;
