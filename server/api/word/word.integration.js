'use strict';

var app = require('../..');
import request from 'supertest';

var newWord;

describe('Word API:', function() {

  describe('GET /api/words', function() {
    var words;

    beforeEach(function(done) {
      request(app)
        .get('/api/words')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          words = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      words.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/words', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/words')
        .send({
          name: 'New Word',
          info: 'This is the brand new word!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWord = res.body;
          done();
        });
    });

    it('should respond with the newly created word', function() {
      newWord.name.should.equal('New Word');
      newWord.info.should.equal('This is the brand new word!!!');
    });

  });

  describe('GET /api/words/:id', function() {
    var word;

    beforeEach(function(done) {
      request(app)
        .get('/api/words/' + newWord._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          word = res.body;
          done();
        });
    });

    afterEach(function() {
      word = {};
    });

    it('should respond with the requested word', function() {
      word.name.should.equal('New Word');
      word.info.should.equal('This is the brand new word!!!');
    });

  });

  describe('PUT /api/words/:id', function() {
    var updatedWord;

    beforeEach(function(done) {
      request(app)
        .put('/api/words/' + newWord._id)
        .send({
          name: 'Updated Word',
          info: 'This is the updated word!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWord = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWord = {};
    });

    it('should respond with the updated word', function() {
      updatedWord.name.should.equal('Updated Word');
      updatedWord.info.should.equal('This is the updated word!!!');
    });

  });

  describe('DELETE /api/words/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/words/' + newWord._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when word does not exist', function(done) {
      request(app)
        .delete('/api/words/' + newWord._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
