'use strict';

const router = require('express').Router();
const postArticleHandler = require('../handler/postArticle');
const getArticle = require('../handler/getArticle');

router.route('/create/article')
  .post(postArticleHandler);

router.route('/find/article')
  .get(getArticle);

router.route('*')
  .all((req, res) => {
    res.end('<h1>Not Found. Please refer to our documentation.</h1>');
  })

module.exports = router;
