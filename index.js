'use strict';

require('dotenv').config();

const app = require('./src/app');
const db = require('./connection/dbConnect');

app.listen(Number(process.env.PORT), async () => {
  try {
    await db.connect();
    console.log('db connect. listening on 3000');
  } catch (e) {
    console.log(e);
  }
})
