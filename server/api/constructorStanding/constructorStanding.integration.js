'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newConstructorStanding;

describe('ConstructorStanding API:', function() {
  describe('GET /api/constructorStandings', function() {
    var constructorStandings;

    beforeEach(function(done) {
      request(app)
        .get('/api/constructorStandings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructorStandings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(constructorStandings).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/constructorStandings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/constructorStandings')
        .send({
          name: 'New ConstructorStanding',
          info: 'This is the brand new constructorStanding!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newConstructorStanding = res.body;
          done();
        });
    });

    it('should respond with the newly created constructorStanding', function() {
      expect(newConstructorStanding.name).to.equal('New ConstructorStanding');
      expect(newConstructorStanding.info).to.equal('This is the brand new constructorStanding!!!');
    });
  });

  describe('GET /api/constructorStandings/:id', function() {
    var constructorStanding;

    beforeEach(function(done) {
      request(app)
        .get(`/api/constructorStandings/${newConstructorStanding._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          constructorStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      constructorStanding = {};
    });

    it('should respond with the requested constructorStanding', function() {
      expect(constructorStanding.name).to.equal('New ConstructorStanding');
      expect(constructorStanding.info).to.equal('This is the brand new constructorStanding!!!');
    });
  });

  describe('PUT /api/constructorStandings/:id', function() {
    var updatedConstructorStanding;

    beforeEach(function(done) {
      request(app)
        .put(`/api/constructorStandings/${newConstructorStanding._id}`)
        .send({
          name: 'Updated ConstructorStanding',
          info: 'This is the updated constructorStanding!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedConstructorStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConstructorStanding = {};
    });

    it('should respond with the updated constructorStanding', function() {
      expect(updatedConstructorStanding.name).to.equal('Updated ConstructorStanding');
      expect(updatedConstructorStanding.info).to.equal('This is the updated constructorStanding!!!');
    });

    it('should respond with the updated constructorStanding on a subsequent GET', function(done) {
      request(app)
        .get(`/api/constructorStandings/${newConstructorStanding._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let constructorStanding = res.body;

          expect(constructorStanding.name).to.equal('Updated ConstructorStanding');
          expect(constructorStanding.info).to.equal('This is the updated constructorStanding!!!');

          done();
        });
    });
  });

  describe('PATCH /api/constructorStandings/:id', function() {
    var patchedConstructorStanding;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/constructorStandings/${newConstructorStanding._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ConstructorStanding' },
          { op: 'replace', path: '/info', value: 'This is the patched constructorStanding!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedConstructorStanding = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedConstructorStanding = {};
    });

    it('should respond with the patched constructorStanding', function() {
      expect(patchedConstructorStanding.name).to.equal('Patched ConstructorStanding');
      expect(patchedConstructorStanding.info).to.equal('This is the patched constructorStanding!!!');
    });
  });

  describe('DELETE /api/constructorStandings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/constructorStandings/${newConstructorStanding._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when constructorStanding does not exist', function(done) {
      request(app)
        .delete(`/api/constructorStandings/${newConstructorStanding._id}`)
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
