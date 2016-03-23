'use strict';

var app = require('../..');
import request from 'supertest';

var newWordPack;

describe('WordPack API:', function() {

  describe('GET /api/wordPacks', function() {
    var wordPacks;

    beforeEach(function(done) {
      request(app)
        .get('/api/wordPacks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wordPacks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      wordPacks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/wordPacks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wordPacks')
        .send({
          name: 'New WordPack',
          info: 'This is the brand new wordPack!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWordPack = res.body;
          done();
        });
    });

    it('should respond with the newly created wordPack', function() {
      newWordPack.name.should.equal('New WordPack');
      newWordPack.info.should.equal('This is the brand new wordPack!!!');
    });

  });

  describe('GET /api/wordPacks/:id', function() {
    var wordPack;

    beforeEach(function(done) {
      request(app)
        .get('/api/wordPacks/' + newWordPack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wordPack = res.body;
          done();
        });
    });

    afterEach(function() {
      wordPack = {};
    });

    it('should respond with the requested wordPack', function() {
      wordPack.name.should.equal('New WordPack');
      wordPack.info.should.equal('This is the brand new wordPack!!!');
    });

  });

  describe('PUT /api/wordPacks/:id', function() {
    var updatedWordPack;

    beforeEach(function(done) {
      request(app)
        .put('/api/wordPacks/' + newWordPack._id)
        .send({
          name: 'Updated WordPack',
          info: 'This is the updated wordPack!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWordPack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWordPack = {};
    });

    it('should respond with the updated wordPack', function() {
      updatedWordPack.name.should.equal('Updated WordPack');
      updatedWordPack.info.should.equal('This is the updated wordPack!!!');
    });

  });

  describe('DELETE /api/wordPacks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/wordPacks/' + newWordPack._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when wordPack does not exist', function(done) {
      request(app)
        .delete('/api/wordPacks/' + newWordPack._id)
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
