'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCircuit;

describe('Circuit API:', function() {
  describe('GET /api/circuits', function() {
    var circuits;

    beforeEach(function(done) {
      request(app)
        .get('/api/circuits')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          circuits = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(circuits).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/circuits', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/circuits')
        .send({
          name: 'New Circuit',
          info: 'This is the brand new circuit!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCircuit = res.body;
          done();
        });
    });

    it('should respond with the newly created circuit', function() {
      expect(newCircuit.name).to.equal('New Circuit');
      expect(newCircuit.info).to.equal('This is the brand new circuit!!!');
    });
  });

  describe('GET /api/circuits/:id', function() {
    var circuit;

    beforeEach(function(done) {
      request(app)
        .get(`/api/circuits/${newCircuit._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          circuit = res.body;
          done();
        });
    });

    afterEach(function() {
      circuit = {};
    });

    it('should respond with the requested circuit', function() {
      expect(circuit.name).to.equal('New Circuit');
      expect(circuit.info).to.equal('This is the brand new circuit!!!');
    });
  });

  describe('PUT /api/circuits/:id', function() {
    var updatedCircuit;

    beforeEach(function(done) {
      request(app)
        .put(`/api/circuits/${newCircuit._id}`)
        .send({
          name: 'Updated Circuit',
          info: 'This is the updated circuit!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCircuit = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCircuit = {};
    });

    it('should respond with the updated circuit', function() {
      expect(updatedCircuit.name).to.equal('Updated Circuit');
      expect(updatedCircuit.info).to.equal('This is the updated circuit!!!');
    });

    it('should respond with the updated circuit on a subsequent GET', function(done) {
      request(app)
        .get(`/api/circuits/${newCircuit._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let circuit = res.body;

          expect(circuit.name).to.equal('Updated Circuit');
          expect(circuit.info).to.equal('This is the updated circuit!!!');

          done();
        });
    });
  });

  describe('PATCH /api/circuits/:id', function() {
    var patchedCircuit;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/circuits/${newCircuit._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Circuit' },
          { op: 'replace', path: '/info', value: 'This is the patched circuit!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCircuit = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCircuit = {};
    });

    it('should respond with the patched circuit', function() {
      expect(patchedCircuit.name).to.equal('Patched Circuit');
      expect(patchedCircuit.info).to.equal('This is the patched circuit!!!');
    });
  });

  describe('DELETE /api/circuits/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/circuits/${newCircuit._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when circuit does not exist', function(done) {
      request(app)
        .delete(`/api/circuits/${newCircuit._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
