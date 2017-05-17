/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/races              ->  index
 * POST    /api/races              ->  create
 * GET     /api/races/:id          ->  show
 * PUT     /api/races/:id          ->  upsert
 * PATCH   /api/races/:id          ->  patch
 * DELETE  /api/races/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import { Race, Circuit } from '../../sqldb';

// Gets a list of Races
export function index(req, res) {
  return Race.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Race from the DB
export function show(req, res) {
  return Race.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new Race in the DB
export function create(req, res) {
  return Race.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given Race in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Race.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing Race in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Race.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a Race from the DB
export function destroy(req, res) {
  return Race.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.removeEntity(res))
    .catch(Response.handleError(res));
}
