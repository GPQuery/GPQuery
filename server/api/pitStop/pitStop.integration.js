'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newPitStop;

describe('PitStop API:', function() {
  describe('GET /api/pitStops', function() {
    var pitStops;

    beforeEach(function(done) {
      request(app)
        .get('/api/pitStops')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pitStops = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(pitStops).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/pitStops', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/pitStops')
        .send({
          name: 'New PitStop',
          info: 'This is the brand new pitStop!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newPitStop = res.body;
          done();
        });
    });

    it('should respond with the newly created pitStop', function() {
      expect(newPitStop.name).to.equal('New PitStop');
      expect(newPitStop.info).to.equal('This is the brand new pitStop!!!');
    });
  });

  describe('GET /api/pitStops/:id', function() {
    var pitStop;

    beforeEach(function(done) {
      request(app)
        .get(`/api/pitStops/${newPitStop._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          pitStop = res.body;
          done();
        });
    });

    afterEach(function() {
      pitStop = {};
    });

    it('should respond with the requested pitStop', function() {
      expect(pitStop.name).to.equal('New PitStop');
      expect(pitStop.info).to.equal('This is the brand new pitStop!!!');
    });
  });

  describe('PUT /api/pitStops/:id', function() {
    var updatedPitStop;

    beforeEach(function(done) {
      request(app)
        .put(`/api/pitStops/${newPitStop._id}`)
        .send({
          name: 'Updated PitStop',
          info: 'This is the updated pitStop!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedPitStop = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPitStop = {};
    });

    it('should respond with the updated pitStop', function() {
      expect(updatedPitStop.name).to.equal('Updated PitStop');
      expect(updatedPitStop.info).to.equal('This is the updated pitStop!!!');
    });

    it('should respond with the updated pitStop on a subsequent GET', function(done) {
      request(app)
        .get(`/api/pitStops/${newPitStop._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let pitStop = res.body;

          expect(pitStop.name).to.equal('Updated PitStop');
          expect(pitStop.info).to.equal('This is the updated pitStop!!!');

          done();
        });
    });
  });

  describe('PATCH /api/pitStops/:id', function() {
    var patchedPitStop;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/pitStops/${newPitStop._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched PitStop' },
          { op: 'replace', path: '/info', value: 'This is the patched pitStop!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedPitStop = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedPitStop = {};
    });

    it('should respond with the patched pitStop', function() {
      expect(patchedPitStop.name).to.equal('Patched PitStop');
      expect(patchedPitStop.info).to.equal('This is the patched pitStop!!!');
    });
  });

  describe('DELETE /api/pitStops/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/pitStops/${newPitStop._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when pitStop does not exist', function(done) {
      request(app)
        .delete(`/api/pitStops/${newPitStop._id}`)
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
