/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructorResults              ->  index
 * POST    /api/constructorResults              ->  create
 * GET     /api/constructorResults/:id          ->  show
 * PUT     /api/constructorResults/:id          ->  upsert
 * PATCH   /api/constructorResults/:id          ->  patch
 * DELETE  /api/constructorResults/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {ConstructorResult} from '../../sqldb';

// Gets a list of ConstructorResults
export function index(req, res) {
  return ConstructorResult.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single ConstructorResult from the DB
export function show(req, res) {
  return ConstructorResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new ConstructorResult in the DB
export function create(req, res) {
  return ConstructorResult.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given ConstructorResult in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return ConstructorResult.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing ConstructorResult in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return ConstructorResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a ConstructorResult from the DB
export function destroy(req, res) {
  return ConstructorResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
