'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newFlag;

describe('Flag API:', function() {
  describe('GET /api/flags', function() {
    var flags;

    beforeEach(function(done) {
      request(app)
        .get('/api/flags')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          flags = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(flags).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/flags', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/flags')
        .send({
          name: 'New Flag',
          info: 'This is the brand new flag!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newFlag = res.body;
          done();
        });
    });

    it('should respond with the newly created flag', function() {
      expect(newFlag.name).to.equal('New Flag');
      expect(newFlag.info).to.equal('This is the brand new flag!!!');
    });
  });

  describe('GET /api/flags/:id', function() {
    var flag;

    beforeEach(function(done) {
      request(app)
        .get(`/api/flags/${newFlag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          flag = res.body;
          done();
        });
    });

    afterEach(function() {
      flag = {};
    });

    it('should respond with the requested flag', function() {
      expect(flag.name).to.equal('New Flag');
      expect(flag.info).to.equal('This is the brand new flag!!!');
    });
  });

  describe('PUT /api/flags/:id', function() {
    var updatedFlag;

    beforeEach(function(done) {
      request(app)
        .put(`/api/flags/${newFlag._id}`)
        .send({
          name: 'Updated Flag',
          info: 'This is the updated flag!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedFlag = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFlag = {};
    });

    it('should respond with the updated flag', function() {
      expect(updatedFlag.name).to.equal('Updated Flag');
      expect(updatedFlag.info).to.equal('This is the updated flag!!!');
    });

    it('should respond with the updated flag on a subsequent GET', function(done) {
      request(app)
        .get(`/api/flags/${newFlag._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let flag = res.body;

          expect(flag.name).to.equal('Updated Flag');
          expect(flag.info).to.equal('This is the updated flag!!!');

          done();
        });
    });
  });

  describe('PATCH /api/flags/:id', function() {
    var patchedFlag;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/flags/${newFlag._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Flag' },
          { op: 'replace', path: '/info', value: 'This is the patched flag!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedFlag = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedFlag = {};
    });

    it('should respond with the patched flag', function() {
      expect(patchedFlag.name).to.equal('Patched Flag');
      expect(patchedFlag.info).to.equal('This is the patched flag!!!');
    });
  });

  describe('DELETE /api/flags/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/flags/${newFlag._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when flag does not exist', function(done) {
      request(app)
        .delete(`/api/flags/${newFlag._id}`)
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
