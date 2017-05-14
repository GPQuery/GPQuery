'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var driverStandingCtrlStub = {
  index: 'driverStandingCtrl.index',
  show: 'driverStandingCtrl.show',
  create: 'driverStandingCtrl.create',
  upsert: 'driverStandingCtrl.upsert',
  patch: 'driverStandingCtrl.patch',
  destroy: 'driverStandingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var driverStandingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './driverStanding.controller': driverStandingCtrlStub
});

describe('DriverStanding API Router:', function() {
  it('should return an express router instance', function() {
    expect(driverStandingIndex).to.equal(routerStub);
  });

  describe('GET /api/driverStandings', function() {
    it('should route to driverStanding.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'driverStandingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/driverStandings/:id', function() {
    it('should route to driverStanding.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'driverStandingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/driverStandings', function() {
    it('should route to driverStanding.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'driverStandingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/driverStandings/:id', function() {
    it('should route to driverStanding.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'driverStandingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/driverStandings/:id', function() {
    it('should route to driverStanding.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'driverStandingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/driverStandings/:id', function() {
    it('should route to driverStanding.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'driverStandingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
