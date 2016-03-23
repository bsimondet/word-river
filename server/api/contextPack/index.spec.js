'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contextPackCtrlStub = {
  index: 'contextPackCtrl.index',
  show: 'contextPackCtrl.show',
  create: 'contextPackCtrl.create',
  update: 'contextPackCtrl.update',
  destroy: 'contextPackCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contextPackIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contextPack.controller': contextPackCtrlStub
});

describe('ContextPack API Router:', function() {

  it('should return an express router instance', function() {
    contextPackIndex.should.equal(routerStub);
  });

  describe('GET /api/contextPacks', function() {

    it('should route to contextPack.controller.index', function() {
      routerStub.get
        .withArgs('/', 'contextPackCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/contextPacks/:id', function() {

    it('should route to contextPack.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'contextPackCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/contextPacks', function() {

    it('should route to contextPack.controller.create', function() {
      routerStub.post
        .withArgs('/', 'contextPackCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/contextPacks/:id', function() {

    it('should route to contextPack.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'contextPackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contextPacks/:id', function() {

    it('should route to contextPack.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'contextPackCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contextPacks/:id', function() {

    it('should route to contextPack.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'contextPackCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
