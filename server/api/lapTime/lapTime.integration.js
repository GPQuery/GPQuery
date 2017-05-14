'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newLapTime;

describe('LapTime API:', function() {
  describe('GET /api/lapTimes', function() {
    var lapTimes;

    beforeEach(function(done) {
      request(app)
        .get('/api/lapTimes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lapTimes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(lapTimes).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/lapTimes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lapTimes')
        .send({
          name: 'New LapTime',
          info: 'This is the brand new lapTime!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newLapTime = res.body;
          done();
        });
    });

    it('should respond with the newly created lapTime', function() {
      expect(newLapTime.name).to.equal('New LapTime');
      expect(newLapTime.info).to.equal('This is the brand new lapTime!!!');
    });
  });

  describe('GET /api/lapTimes/:id', function() {
    var lapTime;

    beforeEach(function(done) {
      request(app)
        .get(`/api/lapTimes/${newLapTime._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          lapTime = res.body;
          done();
        });
    });

    afterEach(function() {
      lapTime = {};
    });

    it('should respond with the requested lapTime', function() {
      expect(lapTime.name).to.equal('New LapTime');
      expect(lapTime.info).to.equal('This is the brand new lapTime!!!');
    });
  });

  describe('PUT /api/lapTimes/:id', function() {
    var updatedLapTime;

    beforeEach(function(done) {
      request(app)
        .put(`/api/lapTimes/${newLapTime._id}`)
        .send({
          name: 'Updated LapTime',
          info: 'This is the updated lapTime!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedLapTime = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLapTime = {};
    });

    it('should respond with the updated lapTime', function() {
      expect(updatedLapTime.name).to.equal('Updated LapTime');
      expect(updatedLapTime.info).to.equal('This is the updated lapTime!!!');
    });

    it('should respond with the updated lapTime on a subsequent GET', function(done) {
      request(app)
        .get(`/api/lapTimes/${newLapTime._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let lapTime = res.body;

          expect(lapTime.name).to.equal('Updated LapTime');
          expect(lapTime.info).to.equal('This is the updated lapTime!!!');

          done();
        });
    });
  });

  describe('PATCH /api/lapTimes/:id', function() {
    var patchedLapTime;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/lapTimes/${newLapTime._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched LapTime' },
          { op: 'replace', path: '/info', value: 'This is the patched lapTime!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedLapTime = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedLapTime = {};
    });

    it('should respond with the patched lapTime', function() {
      expect(patchedLapTime.name).to.equal('Patched LapTime');
      expect(patchedLapTime.info).to.equal('This is the patched lapTime!!!');
    });
  });

  describe('DELETE /api/lapTimes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/lapTimes/${newLapTime._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when lapTime does not exist', function(done) {
      request(app)
        .delete(`/api/lapTimes/${newLapTime._id}`)
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
