'use strict';

const ArticleFinder = require('../class/ArticleFinder');

const getArticle = async (req, res) => {
  const { author, query } = req.query;

  try {
    const articleFinder = new ArticleFinder({
      author,
      query,
    });

    const result = await articleFinder.findArticle();

    res.status(200).json({ result });
  } catch (e) {
    res.sendStatus(500);
  }
};

module.exports = getArticle;
