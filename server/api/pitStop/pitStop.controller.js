/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pitStops              ->  index
 * POST    /api/pitStops              ->  create
 * GET     /api/pitStops/:id          ->  show
 * PUT     /api/pitStops/:id          ->  upsert
 * PATCH   /api/pitStops/:id          ->  patch
 * DELETE  /api/pitStops/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {PitStop} from '../../sqldb';

// Gets a list of PitStops
export function index(req, res) {
  return PitStop.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single PitStop from the DB
export function show(req, res) {
  return PitStop.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new PitStop in the DB
export function create(req, res) {
  return PitStop.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given PitStop in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return PitStop.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing PitStop in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return PitStop.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a PitStop from the DB
export function destroy(req, res) {
  return PitStop.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
