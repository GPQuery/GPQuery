/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructors              ->  index
 * POST    /api/constructors              ->  create
 * GET     /api/constructors/:id          ->  show
 * PUT     /api/constructors/:id          ->  upsert
 * PATCH   /api/constructors/:id          ->  patch
 * DELETE  /api/constructors/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {Constructor} from '../../sqldb';

// Gets a list of Constructors
export function index(req, res) {
  return Constructor.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Constructor from the DB
export function show(req, res) {
  return Constructor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new Constructor in the DB
export function create(req, res) {
  return Constructor.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given Constructor in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return Constructor.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing Constructor in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Constructor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a Constructor from the DB
export function destroy(req, res) {
  return Constructor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
