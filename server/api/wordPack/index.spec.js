'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wordPackCtrlStub = {
  index: 'wordPackCtrl.index',
  show: 'wordPackCtrl.show',
  create: 'wordPackCtrl.create',
  update: 'wordPackCtrl.update',
  destroy: 'wordPackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wordPackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './wordPack.controller': wordPackCtrlStub
});

describe('WordPack API Router:', function() {

  it('should return an express router instance', function() {
    wordPackIndex.should.equal(routerStub);
  });

  describe('GET /api/wordPacks', function() {

    it('should route to wordPack.controller.index', function() {
      routerStub.get
        .withArgs('/', 'wordPackCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/wordPacks/:id', function() {

    it('should route to wordPack.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'wordPackCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/wordPacks', function() {

    it('should route to wordPack.controller.create', function() {
      routerStub.post
        .withArgs('/', 'wordPackCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/wordPacks/:id', function() {

    it('should route to wordPack.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'wordPackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/wordPacks/:id', function() {

    it('should route to wordPack.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'wordPackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/wordPacks/:id', function() {

    it('should route to wordPack.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'wordPackCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
