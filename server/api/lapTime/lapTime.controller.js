/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lapTimes              ->  index
 * POST    /api/lapTimes              ->  create
 * GET     /api/lapTimes/:id          ->  show
 * PUT     /api/lapTimes/:id          ->  upsert
 * PATCH   /api/lapTimes/:id          ->  patch
 * DELETE  /api/lapTimes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {LapTime} from '../../sqldb';

// Gets a list of LapTimes
export function index(req, res) {
  return LapTime.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single LapTime from the DB
export function show(req, res) {
  return LapTime.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new LapTime in the DB
export function create(req, res) {
  return LapTime.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given LapTime in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return LapTime.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing LapTime in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return LapTime.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a LapTime from the DB
export function destroy(req, res) {
  return LapTime.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
