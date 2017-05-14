'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var flagCtrlStub = {
  index: 'flagCtrl.index',
  show: 'flagCtrl.show',
  create: 'flagCtrl.create',
  upsert: 'flagCtrl.upsert',
  patch: 'flagCtrl.patch',
  destroy: 'flagCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var flagIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './flag.controller': flagCtrlStub
});

describe('Flag API Router:', function() {
  it('should return an express router instance', function() {
    expect(flagIndex).to.equal(routerStub);
  });

  describe('GET /api/flags', function() {
    it('should route to flag.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'flagCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/flags/:id', function() {
    it('should route to flag.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'flagCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/flags', function() {
    it('should route to flag.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'flagCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/flags/:id', function() {
    it('should route to flag.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'flagCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/flags/:id', function() {
    it('should route to flag.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'flagCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/flags/:id', function() {
    it('should route to flag.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'flagCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
