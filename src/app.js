'use strict';

const express = require('express');
const router = require('./router/routes');

const app = express();

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
app.use('/kumparanTest', router);

module.exports = app;
