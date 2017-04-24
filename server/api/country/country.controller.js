/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/countries              ->  index
 * POST    /api/countries              ->  create
 * GET     /api/countries/:id          ->  show
 * PUT     /api/countries/:id          ->  upsert
 * PATCH   /api/countries/:id          ->  patch
 * DELETE  /api/countries/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import response from '../../components/response';
import {Country} from '../../sqldb';

// Gets a list of Countries
export function index(req, res) {
  return Country.findAll()
    .then(response.respondWithResult(res))
    .catch(response.handleError(res));
}

// Gets a single Country from the DB
export function show(req, res) {
  return Country.find({
    where: {
      _id: req.params.id
    }
  })
    .then(response.handleEntityNotFound(res))
    .then(response.respondWithResult(res))
    .catch(response.handleError(res));
}

// Creates a new Country in the DB
export function create(req, res) {
  return Country.create(req.body)
    .then(response.respondWithResult(res, 201))
    .catch(response.handleError(res));
}

// Upserts the given Country in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Country.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(response.respondWithResult(res))
    .catch(response.handleError(res));
}

// Updates an existing Country in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Country.find({
    where: {
      _id: req.params.id
    }
  })
    .then(response.handleEntityNotFound(res))
    .then(response.patchUpdates(req.body))
    .then(response.respondWithResult(res))
    .catch(response.handleError(res));
}

// Deletes a Country from the DB
export function destroy(req, res) {
  return Country.find({
    where: {
      _id: req.params.id
    }
  })
    .then(response.handleEntityNotFound(res))
    .then(response.removeEntity(res))
    .catch(response.handleError(res));
}
