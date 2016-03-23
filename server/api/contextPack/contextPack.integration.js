'use strict';

var app = require('../..');
import request from 'supertest';

var newContextPack;

describe('ContextPack API:', function() {

  describe('GET /api/contextPacks', function() {
    var contextPacks;

    beforeEach(function(done) {
      request(app)
        .get('/api/contextPacks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contextPacks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      contextPacks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/contextPacks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contextPacks')
        .send({
          name: 'New ContextPack',
          info: 'This is the brand new contextPack!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContextPack = res.body;
          done();
        });
    });

    it('should respond with the newly created contextPack', function() {
      newContextPack.name.should.equal('New ContextPack');
      newContextPack.info.should.equal('This is the brand new contextPack!!!');
    });

  });

  describe('GET /api/contextPacks/:id', function() {
    var contextPack;

    beforeEach(function(done) {
      request(app)
        .get('/api/contextPacks/' + newContextPack._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contextPack = res.body;
          done();
        });
    });

    afterEach(function() {
      contextPack = {};
    });

    it('should respond with the requested contextPack', function() {
      contextPack.name.should.equal('New ContextPack');
      contextPack.info.should.equal('This is the brand new contextPack!!!');
    });

  });

  describe('PUT /api/contextPacks/:id', function() {
    var updatedContextPack;

    beforeEach(function(done) {
      request(app)
        .put('/api/contextPacks/' + newContextPack._id)
        .send({
          name: 'Updated ContextPack',
          info: 'This is the updated contextPack!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContextPack = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContextPack = {};
    });

    it('should respond with the updated contextPack', function() {
      updatedContextPack.name.should.equal('Updated ContextPack');
      updatedContextPack.info.should.equal('This is the updated contextPack!!!');
    });

  });

  describe('DELETE /api/contextPacks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contextPacks/' + newContextPack._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contextPack does not exist', function(done) {
      request(app)
        .delete('/api/contextPacks/' + newContextPack._id)
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
