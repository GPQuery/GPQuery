'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newConstructor;

describe('Constructor API:', function() {
  describe('GET /api/constructors', function() {
    var constructors;

    beforeEach(function(done) {
      request(app)
        .get('/api/constructors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(constructors).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/constructors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/constructors')
        .send({
          name: 'New Constructor',
          info: 'This is the brand new constructor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newConstructor = res.body;
          done();
        });
    });

    it('should respond with the newly created constructor', function() {
      expect(newConstructor.name).to.equal('New Constructor');
      expect(newConstructor.info).to.equal('This is the brand new constructor!!!');
    });
  });

  describe('GET /api/constructors/:id', function() {
    var constructor;

    beforeEach(function(done) {
      request(app)
        .get(`/api/constructors/${newConstructor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructor = res.body;
          done();
        });
    });

    afterEach(function() {
      constructor = {};
    });

    it('should respond with the requested constructor', function() {
      expect(constructor.name).to.equal('New Constructor');
      expect(constructor.info).to.equal('This is the brand new constructor!!!');
    });
  });

  describe('PUT /api/constructors/:id', function() {
    var updatedConstructor;

    beforeEach(function(done) {
      request(app)
        .put(`/api/constructors/${newConstructor._id}`)
        .send({
          name: 'Updated Constructor',
          info: 'This is the updated constructor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedConstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConstructor = {};
    });

    it('should respond with the updated constructor', function() {
      expect(updatedConstructor.name).to.equal('Updated Constructor');
      expect(updatedConstructor.info).to.equal('This is the updated constructor!!!');
    });

    it('should respond with the updated constructor on a subsequent GET', function(done) {
      request(app)
        .get(`/api/constructors/${newConstructor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let constructor = res.body;

          expect(constructor.name).to.equal('Updated Constructor');
          expect(constructor.info).to.equal('This is the updated constructor!!!');

          done();
        });
    });
  });

  describe('PATCH /api/constructors/:id', function() {
    var patchedConstructor;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/constructors/${newConstructor._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Constructor' },
          { op: 'replace', path: '/info', value: 'This is the patched constructor!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedConstructor = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedConstructor = {};
    });

    it('should respond with the patched constructor', function() {
      expect(patchedConstructor.name).to.equal('Patched Constructor');
      expect(patchedConstructor.info).to.equal('This is the patched constructor!!!');
    });
  });

  describe('DELETE /api/constructors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/constructors/${newConstructor._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when constructor does not exist', function(done) {
      request(app)
        .delete(`/api/constructors/${newConstructor._id}`)
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
