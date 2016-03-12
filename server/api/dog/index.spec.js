'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var dogCtrlStub = {
  index: 'dogCtrl.index',
  show: 'dogCtrl.show',
  create: 'dogCtrl.create',
  update: 'dogCtrl.update',
  destroy: 'dogCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var dogIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './dog.controller': dogCtrlStub
});

describe('Dog API Router:', function() {

  it('should return an express router instance', function() {
    dogIndex.should.equal(routerStub);
  });

  describe('GET /api/dogs', function() {

    it('should route to dog.controller.index', function() {
      routerStub.get
        .withArgs('/', 'dogCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/dogs/:id', function() {

    it('should route to dog.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'dogCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/dogs', function() {

    it('should route to dog.controller.create', function() {
      routerStub.post
        .withArgs('/', 'dogCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/dogs/:id', function() {

    it('should route to dog.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'dogCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/dogs/:id', function() {

    it('should route to dog.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'dogCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/dogs/:id', function() {

    it('should route to dog.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'dogCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
