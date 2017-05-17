/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qualifying              ->  index
 * POST    /api/qualifying              ->  create
 * GET     /api/qualifying/:id          ->  show
 * PUT     /api/qualifying/:id          ->  upsert
 * PATCH   /api/qualifying/:id          ->  patch
 * DELETE  /api/qualifying/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {Qualifying} from '../../sqldb';

// Gets a list of Qualifyings
export function index(req, res) {
  return Qualifying.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Qualifying from the DB
export function show(req, res) {
  return Qualifying.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new Qualifying in the DB
export function create(req, res) {
  return Qualifying.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given Qualifying in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Qualifying.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing Qualifying in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Qualifying.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a Qualifying from the DB
export function destroy(req, res) {
  return Qualifying.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
