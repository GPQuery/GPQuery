'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newQualifying;

describe('Qualifying API:', function() {
  describe('GET /api/qualifying', function() {
    var qualifyings;

    beforeEach(function(done) {
      request(app)
        .get('/api/qualifying')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qualifyings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(qualifyings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/qualifying', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/qualifying')
        .send({
          name: 'New Qualifying',
          info: 'This is the brand new qualifying!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newQualifying = res.body;
          done();
        });
    });

    it('should respond with the newly created qualifying', function() {
      expect(newQualifying.name).to.equal('New Qualifying');
      expect(newQualifying.info).to.equal('This is the brand new qualifying!!!');
    });
  });

  describe('GET /api/qualifying/:id', function() {
    var qualifying;

    beforeEach(function(done) {
      request(app)
        .get(`/api/qualifying/${newQualifying._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          qualifying = res.body;
          done();
        });
    });

    afterEach(function() {
      qualifying = {};
    });

    it('should respond with the requested qualifying', function() {
      expect(qualifying.name).to.equal('New Qualifying');
      expect(qualifying.info).to.equal('This is the brand new qualifying!!!');
    });
  });

  describe('PUT /api/qualifying/:id', function() {
    var updatedQualifying;

    beforeEach(function(done) {
      request(app)
        .put(`/api/qualifying/${newQualifying._id}`)
        .send({
          name: 'Updated Qualifying',
          info: 'This is the updated qualifying!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedQualifying = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedQualifying = {};
    });

    it('should respond with the updated qualifying', function() {
      expect(updatedQualifying.name).to.equal('Updated Qualifying');
      expect(updatedQualifying.info).to.equal('This is the updated qualifying!!!');
    });

    it('should respond with the updated qualifying on a subsequent GET', function(done) {
      request(app)
        .get(`/api/qualifying/${newQualifying._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let qualifying = res.body;

          expect(qualifying.name).to.equal('Updated Qualifying');
          expect(qualifying.info).to.equal('This is the updated qualifying!!!');

          done();
        });
    });
  });

  describe('PATCH /api/qualifying/:id', function() {
    var patchedQualifying;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/qualifying/${newQualifying._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Qualifying' },
          { op: 'replace', path: '/info', value: 'This is the patched qualifying!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedQualifying = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedQualifying = {};
    });

    it('should respond with the patched qualifying', function() {
      expect(patchedQualifying.name).to.equal('Patched Qualifying');
      expect(patchedQualifying.info).to.equal('This is the patched qualifying!!!');
    });
  });

  describe('DELETE /api/qualifying/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/qualifying/${newQualifying._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when qualifying does not exist', function(done) {
      request(app)
        .delete(`/api/qualifying/${newQualifying._id}`)
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
