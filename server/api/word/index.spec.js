'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wordCtrlStub = {
  index: 'wordCtrl.index',
  show: 'wordCtrl.show',
  create: 'wordCtrl.create',
  update: 'wordCtrl.update',
  destroy: 'wordCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wordIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './word.controller': wordCtrlStub
});

describe('Word API Router:', function() {

  it('should return an express router instance', function() {
    wordIndex.should.equal(routerStub);
  });

  describe('GET /api/words', function() {

    it('should route to word.controller.index', function() {
      routerStub.get
        .withArgs('/', 'wordCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/words/:id', function() {

    it('should route to word.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'wordCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/words', function() {

    it('should route to word.controller.create', function() {
      routerStub.post
        .withArgs('/', 'wordCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/words/:id', function() {

    it('should route to word.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'wordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/words/:id', function() {

    it('should route to word.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'wordCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/words/:id', function() {

    it('should route to word.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'wordCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
