'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newConstructorResult;

describe('ConstructorResult API:', function() {
  describe('GET /api/constructorResults', function() {
    var constructorResults;

    beforeEach(function(done) {
      request(app)
        .get('/api/constructorResults')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructorResults = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(constructorResults).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/constructorResults', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/constructorResults')
        .send({
          name: 'New ConstructorResult',
          info: 'This is the brand new constructorResult!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newConstructorResult = res.body;
          done();
        });
    });

    it('should respond with the newly created constructorResult', function() {
      expect(newConstructorResult.name).to.equal('New ConstructorResult');
      expect(newConstructorResult.info).to.equal('This is the brand new constructorResult!!!');
    });
  });

  describe('GET /api/constructorResults/:id', function() {
    var constructorResult;

    beforeEach(function(done) {
      request(app)
        .get(`/api/constructorResults/${newConstructorResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructorResult = res.body;
          done();
        });
    });

    afterEach(function() {
      constructorResult = {};
    });

    it('should respond with the requested constructorResult', function() {
      expect(constructorResult.name).to.equal('New ConstructorResult');
      expect(constructorResult.info).to.equal('This is the brand new constructorResult!!!');
    });
  });

  describe('PUT /api/constructorResults/:id', function() {
    var updatedConstructorResult;

    beforeEach(function(done) {
      request(app)
        .put(`/api/constructorResults/${newConstructorResult._id}`)
        .send({
          name: 'Updated ConstructorResult',
          info: 'This is the updated constructorResult!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedConstructorResult = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConstructorResult = {};
    });

    it('should respond with the updated constructorResult', function() {
      expect(updatedConstructorResult.name).to.equal('Updated ConstructorResult');
      expect(updatedConstructorResult.info).to.equal('This is the updated constructorResult!!!');
    });

    it('should respond with the updated constructorResult on a subsequent GET', function(done) {
      request(app)
        .get(`/api/constructorResults/${newConstructorResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let constructorResult = res.body;

          expect(constructorResult.name).to.equal('Updated ConstructorResult');
          expect(constructorResult.info).to.equal('This is the updated constructorResult!!!');

          done();
        });
    });
  });

  describe('PATCH /api/constructorResults/:id', function() {
    var patchedConstructorResult;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/constructorResults/${newConstructorResult._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ConstructorResult' },
          { op: 'replace', path: '/info', value: 'This is the patched constructorResult!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedConstructorResult = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedConstructorResult = {};
    });

    it('should respond with the patched constructorResult', function() {
      expect(patchedConstructorResult.name).to.equal('Patched ConstructorResult');
      expect(patchedConstructorResult.info).to.equal('This is the patched constructorResult!!!');
    });
  });

  describe('DELETE /api/constructorResults/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/constructorResults/${newConstructorResult._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when constructorResult does not exist', function(done) {
      request(app)
        .delete(`/api/constructorResults/${newConstructorResult._id}`)
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
