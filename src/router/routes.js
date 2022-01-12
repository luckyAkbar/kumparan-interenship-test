'use strict';

const router = require('express').Router();
const postArticleHandler = require('../handler/postArticle');
const getArticle = require('../handler/getArticle');

router.route('/create/article')
  .post(postArticleHandler);

router.route('/find/article')
  .get(getArticle);

module.exports = router;
