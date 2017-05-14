'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var pitStopCtrlStub = {
  index: 'pitStopCtrl.index',
  show: 'pitStopCtrl.show',
  create: 'pitStopCtrl.create',
  upsert: 'pitStopCtrl.upsert',
  patch: 'pitStopCtrl.patch',
  destroy: 'pitStopCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var pitStopIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './pitStop.controller': pitStopCtrlStub
});

describe('PitStop API Router:', function() {
  it('should return an express router instance', function() {
    expect(pitStopIndex).to.equal(routerStub);
  });

  describe('GET /api/pitStops', function() {
    it('should route to pitStop.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'pitStopCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/pitStops/:id', function() {
    it('should route to pitStop.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'pitStopCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/pitStops', function() {
    it('should route to pitStop.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'pitStopCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/pitStops/:id', function() {
    it('should route to pitStop.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'pitStopCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/pitStops/:id', function() {
    it('should route to pitStop.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'pitStopCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/pitStops/:id', function() {
    it('should route to pitStop.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'pitStopCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
