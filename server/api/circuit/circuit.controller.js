/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/circuits              ->  index
 * POST    /api/circuits              ->  create
 * GET     /api/circuits/:id          ->  show
 * PUT     /api/circuits/:id          ->  upsert
 * PATCH   /api/circuits/:id          ->  patch
 * DELETE  /api/circuits/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {Circuit} from '../../sqldb';

// Gets a list of Circuits
export function index(req, res) {
  return Circuit.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Circuit from the DB
export function show(req, res) {
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new Circuit in the DB
export function create(req, res) {
  return Circuit.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given Circuit in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Circuit.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing Circuit in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a Circuit from the DB
export function destroy(req, res) {
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.removeEntity(res))
    .catch(Response.handleError(res));
}
