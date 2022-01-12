'use strict';

const PostArticle = require('../class/PostArticle');

const postArticleHandler = async (req, res) => {
  console.log(req.body)
  const { authorID, title, body } = req.body;

  try {
    const article = new PostArticle({
      authorID,
      title,
      body,
    });

    const articleID = await article.createArticle();
    res.status(201).json({
      ok: true,
      articleID,
    });
  } catch (e) {
    console.log(e);
    res.status(e.HTTPErrorCode).json({ message: e.message });
  }
};

module.exports = postArticleHandler;
