'use strict';

const assert = require('assert').strict;
const db = require('../../connection/dbConnect');
const UserRequestError = require('./UserRequestError');

class PostArticle {
  constructor({ authorID, title, body }) {
    this.authorID = authorID;
    this.title = title;
    this.body = body;

    this._validateAuthorID();
    this._validateArticleData();
  }

  async createArticle() {
    const query = 'INSERT INTO article (author_id, title, body) VALUES ($1, $2, $3) RETURNING id';
    const params = [this.authorID, this.body, this.title];

    try {
      await this._isAuthorExists();
      const { rows } = await db.query(query, params);

      return rows[0].id; // articleID
    } catch (e) {
      throw new UserRequestError(e.message, 500);
    }
  }

  async _isAuthorExists() {
    const query = 'SELECT EXISTS (SELECT 1 FROM author WHERE id = $1)';
    const params = [this.authorID];

    try {
      const { rows } = await db.query(query, params);
      assert.strictEqual(rows[0].exists, true);
    } catch (e) {
      throw new UserRequestError(`Author with ID: ${this.authorID} is not found`, 404);
    }
  }

  _validateAuthorID() {
    if (Number.isNaN(Number(this.authorID))) throw new UserRequestError('Author Id is invalid', 400);
  }

  _validateArticleData() {
    if (this.body === undefined || this.title === undefined) throw new UserRequestError('Body and title of article must be supplied');
  }
}

module.exports = PostArticle;
