const { expect } = require('chai');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);

chai.request('http://localhost:3000')
  .get('/find/article')
  .end(function (err, res) {
    console.log('trying to request article with no params. Server should return latest article...');
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    console.log('passed.');
  });

chai.request('http://localhost:3000')
  .get('/find/article?author=lucky')
  .end(function (err, res) {
    console.log('trying to request article based on author name...');
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    console.log('passed.');
  });

chai.request('http://localhost:3000')
  .get('/find/article?query=body')
  .end(function (err, res) {
    console.log('trying to request article based on query...');
    expect(err).to.be.null;
    expect(res).to.have.status(200);
    console.log('passed.');
  });

chai.request('http://localhost:3000') // test to upload a new article
  .post('/create/article')
  .type('application/json')
  .send({
    'title': 'Testing title',
    'body': 'Testing Body',
    'authorID': 1,
  })
  .end(function (err, res) {
    console.log('Trying to upload new valid article...');
    expect(err).to.be.null;
    expect(res).to.have.status(201);
    console.log('passed.');
  });

chai.request('http://localhost:3000') // test to falsely send article data to see if server returning error.
  .post('/create/article')
  .type('application/json')
  .send({
    'title': 'Testing title',
    'body': 'Testing Body',
    'author_id': 1,
  })
  .end(function (err, res) {
    console.log('Trying to send invalid body request...')
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    console.log('passed.');
  });

chai.request('http://localhost:3000') // test to send string author id instead of number
  .post('/create/article')
  .type('application/json')
  .send({
    'title': 'Testing title',
    'body': 'Testing Body',
    'authorID': 'ss',
  })
  .end(function (err, res) {
    console.log('Trying to send mistype author id...');
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    console.log('passed.');
  });

chai.request('http://localhost:3000') // test send incomplete article data
  .post('/create/article')
  .type('application/json')
  .send({
    'body': 'Testing Body',
    'authorID': 1,
  })
  .end(function (err, res) {
    console.log('Trying to send incomplete article data...');
    expect(err).to.be.null;
    expect(res).to.have.status(400);
    console.log('passed.');
  });