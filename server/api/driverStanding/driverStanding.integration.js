'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newDriverStanding;

describe('DriverStanding API:', function() {
  describe('GET /api/driverStandings', function() {
    var driverStandings;

    beforeEach(function(done) {
      request(app)
        .get('/api/driverStandings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          driverStandings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(driverStandings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/driverStandings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/driverStandings')
        .send({
          name: 'New DriverStanding',
          info: 'This is the brand new driverStanding!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newDriverStanding = res.body;
          done();
        });
    });

    it('should respond with the newly created driverStanding', function() {
      expect(newDriverStanding.name).to.equal('New DriverStanding');
      expect(newDriverStanding.info).to.equal('This is the brand new driverStanding!!!');
    });
  });

  describe('GET /api/driverStandings/:id', function() {
    var driverStanding;

    beforeEach(function(done) {
      request(app)
        .get(`/api/driverStandings/${newDriverStanding._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          driverStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      driverStanding = {};
    });

    it('should respond with the requested driverStanding', function() {
      expect(driverStanding.name).to.equal('New DriverStanding');
      expect(driverStanding.info).to.equal('This is the brand new driverStanding!!!');
    });
  });

  describe('PUT /api/driverStandings/:id', function() {
    var updatedDriverStanding;

    beforeEach(function(done) {
      request(app)
        .put(`/api/driverStandings/${newDriverStanding._id}`)
        .send({
          name: 'Updated DriverStanding',
          info: 'This is the updated driverStanding!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedDriverStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDriverStanding = {};
    });

    it('should respond with the updated driverStanding', function() {
      expect(updatedDriverStanding.name).to.equal('Updated DriverStanding');
      expect(updatedDriverStanding.info).to.equal('This is the updated driverStanding!!!');
    });

    it('should respond with the updated driverStanding on a subsequent GET', function(done) {
      request(app)
        .get(`/api/driverStandings/${newDriverStanding._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let driverStanding = res.body;

          expect(driverStanding.name).to.equal('Updated DriverStanding');
          expect(driverStanding.info).to.equal('This is the updated driverStanding!!!');

          done();
        });
    });
  });

  describe('PATCH /api/driverStandings/:id', function() {
    var patchedDriverStanding;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/driverStandings/${newDriverStanding._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched DriverStanding' },
          { op: 'replace', path: '/info', value: 'This is the patched driverStanding!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedDriverStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedDriverStanding = {};
    });

    it('should respond with the patched driverStanding', function() {
      expect(patchedDriverStanding.name).to.equal('Patched DriverStanding');
      expect(patchedDriverStanding.info).to.equal('This is the patched driverStanding!!!');
    });
  });

  describe('DELETE /api/driverStandings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/driverStandings/${newDriverStanding._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when driverStanding does not exist', function(done) {
      request(app)
        .delete(`/api/driverStandings/${newDriverStanding._id}`)
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
