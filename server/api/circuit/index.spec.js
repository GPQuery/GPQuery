'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var circuitCtrlStub = {
  index: 'circuitCtrl.index',
  show: 'circuitCtrl.show',
  create: 'circuitCtrl.create',
  upsert: 'circuitCtrl.upsert',
  patch: 'circuitCtrl.patch',
  destroy: 'circuitCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var circuitIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './circuit.controller': circuitCtrlStub
});

describe('Circuit API Router:', function() {
  it('should return an express router instance', function() {
    expect(circuitIndex).to.equal(routerStub);
  });

  describe('GET /api/circuits', function() {
    it('should route to circuit.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'circuitCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/circuits/:id', function() {
    it('should route to circuit.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'circuitCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/circuits', function() {
    it('should route to circuit.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'circuitCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/circuits/:id', function() {
    it('should route to circuit.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'circuitCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/circuits/:id', function() {
    it('should route to circuit.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'circuitCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/circuits/:id', function() {
    it('should route to circuit.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'circuitCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
