'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var qualifyingCtrlStub = {
  index: 'qualifyingCtrl.index',
  show: 'qualifyingCtrl.show',
  create: 'qualifyingCtrl.create',
  upsert: 'qualifyingCtrl.upsert',
  patch: 'qualifyingCtrl.patch',
  destroy: 'qualifyingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var qualifyingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './qualifying.controller': qualifyingCtrlStub
});

describe('Qualifying API Router:', function() {
  it('should return an express router instance', function() {
    expect(qualifyingIndex).to.equal(routerStub);
  });

  describe('GET /api/qualifying', function() {
    it('should route to qualifying.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'qualifyingCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/qualifying/:id', function() {
    it('should route to qualifying.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'qualifyingCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/qualifying', function() {
    it('should route to qualifying.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'qualifyingCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/qualifying/:id', function() {
    it('should route to qualifying.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'qualifyingCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/qualifying/:id', function() {
    it('should route to qualifying.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'qualifyingCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/qualifying/:id', function() {
    it('should route to qualifying.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'qualifyingCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
