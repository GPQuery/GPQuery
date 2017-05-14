'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var constructorCtrlStub = {
  index: 'constructorCtrl.index',
  show: 'constructorCtrl.show',
  create: 'constructorCtrl.create',
  upsert: 'constructorCtrl.upsert',
  patch: 'constructorCtrl.patch',
  destroy: 'constructorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var constructorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './constructor.controller': constructorCtrlStub
});

describe('Constructor API Router:', function() {
  it('should return an express router instance', function() {
    expect(constructorIndex).to.equal(routerStub);
  });

  describe('GET /api/constructors', function() {
    it('should route to constructor.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'constructorCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/constructors/:id', function() {
    it('should route to constructor.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'constructorCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/constructors', function() {
    it('should route to constructor.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'constructorCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/constructors/:id', function() {
    it('should route to constructor.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'constructorCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/constructors/:id', function() {
    it('should route to constructor.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'constructorCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/constructors/:id', function() {
    it('should route to constructor.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'constructorCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
