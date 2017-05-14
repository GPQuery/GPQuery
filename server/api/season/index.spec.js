'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var seasonCtrlStub = {
  index: 'seasonCtrl.index',
  show: 'seasonCtrl.show',
  create: 'seasonCtrl.create',
  upsert: 'seasonCtrl.upsert',
  patch: 'seasonCtrl.patch',
  destroy: 'seasonCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var seasonIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './season.controller': seasonCtrlStub
});

describe('Season API Router:', function() {
  it('should return an express router instance', function() {
    expect(seasonIndex).to.equal(routerStub);
  });

  describe('GET /api/seasons', function() {
    it('should route to season.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'seasonCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/seasons/:id', function() {
    it('should route to season.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'seasonCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/seasons', function() {
    it('should route to season.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'seasonCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/seasons/:id', function() {
    it('should route to season.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'seasonCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/seasons/:id', function() {
    it('should route to season.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'seasonCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/seasons/:id', function() {
    it('should route to season.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'seasonCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
