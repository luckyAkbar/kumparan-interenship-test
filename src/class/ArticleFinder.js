'use strict';

const db = require("../../connection/dbConnect");
const SystemError = require("./SystemError");

class ArticleFinder {
  constructor({ query, author }) {
    this.query = query;
    this.authorName = author;
    this.searchByAuthorNameResult = undefined;
    this.searchByQueryFromTitleResult = undefined;
    this.searchByQueryFromBodyResult = undefined;
    this.searchByLatestArticle = undefined;
  }

  async findArticle() {
    try {
      await this._searchByAuthor();
      await this._searchByQueryFromTitle();
      await this._searchByQueryFromBody();
      await this._searchByNewestArticle();

      return this._prettifyArticleResult();
    } catch (e) {
      throw new SystemError(e.message);
    }
  }

  async _searchByQueryFromBody() {
    if (this.query === undefined) return;

    const textSearchQuery = this._generateTextSearchQueryParams();
    const params = [textSearchQuery];
    const query = `
      SELECT article.title, article.body, article.created_at, author.name as author_name
      FROM article
      INNER JOIN author
        ON article.id = author.id
      WHERE to_tsvector(article.body)
        @@ to_tsquery($1)
    `;

    try {
      const { rows } = await db.query(query, params);
      this.searchByQueryFromBodyResult = rows;
    } catch (e) {
      throw new Error('Failed to search article from given query');
    }
  }

  async _searchByQueryFromTitle() {
    if (this.query === undefined) return;

    const textSearchQuery = this._generateTextSearchQueryParams();
    const params = [textSearchQuery];
    const query = `
      SELECT article.title, article.body, article.created_at, author.name as author_name
      FROM article
      INNER JOIN author
        ON article.id = author.id
      WHERE to_tsvector(article.title)
        @@ to_tsquery($1)
    `;

    try {
      const { rows } = await db.query(query, params);
      this.searchByQueryFromTitleResult = rows;
    } catch (e) {
      throw new Error('Failed to search article from given query');
    }
  }

  async _searchByAuthor() {
    if (this.authorName === undefined) return;

    const query = `
      SELECT article.title, article.body, article.created_at, author.name as author_name
      FROM author
      INNER JOIN article
        ON author.id = article.author_id
      WHERE name = $1
    `;
    const params = [this.authorName];

    try {
      const { rows } = await db.query(query, params);
      this.searchByAuthorNameResult = rows;
    } catch (e) {
      console.log(e)
      throw new Error('Failed to search article based on Author name');
    }
  }
  
  async _searchByNewestArticle() {
    if (this.query !== undefined || this.authorName !== undefined) return;

    const query = `
      SELECT title, body, created_at
      FROM article
      ORDER BY created_at DESC
      LIMIT 10
    `;

    try {
      const { rows } = await db.query(query);
      this.searchByLatestArticle = rows;
    } catch (e) {
      throw new Error('Failed to search latest article');
    }
  }

  _generateTextSearchQueryParams() {
    const queryParts = this.query.split(' ');
    let textSearchQuery = '';

    for (let i = 0; i < queryParts.length; i++) {
      textSearchQuery += queryParts[i];

      if (i !== queryParts.length -1) textSearchQuery += ' | ';
    }

    return textSearchQuery;
  }

  _prettifyArticleResult() {
    let finalResult = [];

    if (this.searchByAuthorNameResult !== undefined) finalResult = finalResult.concat(this.searchByAuthorNameResult);
    if (this.searchByQueryFromTitleResult !== undefined) finalResult = finalResult.concat(this.searchByQueryFromTitleResult);
    if (this.searchByQueryFromBodyResult !== undefined) finalResult = finalResult.concat(this.searchByQueryFromBodyResult);
    if (this.searchByLatestArticle !== undefined) finalResult = finalResult.concat(this.searchByLatestArticle);

    return finalResult;
  }
}

module.exports = ArticleFinder;
