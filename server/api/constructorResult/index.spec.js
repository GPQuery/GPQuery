'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var constructorResultCtrlStub = {
  index: 'constructorResultCtrl.index',
  show: 'constructorResultCtrl.show',
  create: 'constructorResultCtrl.create',
  upsert: 'constructorResultCtrl.upsert',
  patch: 'constructorResultCtrl.patch',
  destroy: 'constructorResultCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var constructorResultIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './constructorResult.controller': constructorResultCtrlStub
});

describe('ConstructorResult API Router:', function() {
  it('should return an express router instance', function() {
    expect(constructorResultIndex).to.equal(routerStub);
  });

  describe('GET /api/constructorResults', function() {
    it('should route to constructorResult.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'constructorResultCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/constructorResults/:id', function() {
    it('should route to constructorResult.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'constructorResultCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/constructorResults', function() {
    it('should route to constructorResult.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'constructorResultCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/constructorResults/:id', function() {
    it('should route to constructorResult.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'constructorResultCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/constructorResults/:id', function() {
    it('should route to constructorResult.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'constructorResultCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/constructorResults/:id', function() {
    it('should route to constructorResult.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'constructorResultCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
