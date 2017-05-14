'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var constructorStandingCtrlStub = {
  index: 'constructorStandingCtrl.index',
  show: 'constructorStandingCtrl.show',
  create: 'constructorStandingCtrl.create',
  upsert: 'constructorStandingCtrl.upsert',
  patch: 'constructorStandingCtrl.patch',
  destroy: 'constructorStandingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var constructorStandingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './constructorStanding.controller': constructorStandingCtrlStub
});

describe('ConstructorStanding API Router:', function() {
  it('should return an express router instance', function() {
    expect(constructorStandingIndex).to.equal(routerStub);
  });

  describe('GET /api/constructorStandings', function() {
    it('should route to constructorStanding.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'constructorStandingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/constructorStandings/:id', function() {
    it('should route to constructorStanding.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'constructorStandingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/constructorStandings', function() {
    it('should route to constructorStanding.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'constructorStandingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/constructorStandings/:id', function() {
    it('should route to constructorStanding.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'constructorStandingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/constructorStandings/:id', function() {
    it('should route to constructorStanding.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'constructorStandingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/constructorStandings/:id', function() {
    it('should route to constructorStanding.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'constructorStandingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
