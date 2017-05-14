'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var lapTimeCtrlStub = {
  index: 'lapTimeCtrl.index',
  show: 'lapTimeCtrl.show',
  create: 'lapTimeCtrl.create',
  upsert: 'lapTimeCtrl.upsert',
  patch: 'lapTimeCtrl.patch',
  destroy: 'lapTimeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var lapTimeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './lapTime.controller': lapTimeCtrlStub
});

describe('LapTime API Router:', function() {
  it('should return an express router instance', function() {
    expect(lapTimeIndex).to.equal(routerStub);
  });

  describe('GET /api/lapTimes', function() {
    it('should route to lapTime.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'lapTimeCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/lapTimes/:id', function() {
    it('should route to lapTime.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'lapTimeCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/lapTimes', function() {
    it('should route to lapTime.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'lapTimeCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/lapTimes/:id', function() {
    it('should route to lapTime.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'lapTimeCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/lapTimes/:id', function() {
    it('should route to lapTime.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'lapTimeCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/lapTimes/:id', function() {
    it('should route to lapTime.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'lapTimeCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
