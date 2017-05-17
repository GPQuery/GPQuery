/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructorStandings              ->  index
 * POST    /api/constructorStandings              ->  create
 * GET     /api/constructorStandings/:id          ->  show
 * PUT     /api/constructorStandings/:id          ->  upsert
 * PATCH   /api/constructorStandings/:id          ->  patch
 * DELETE  /api/constructorStandings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {ConstructorStanding} from '../../sqldb';

// Gets a list of ConstructorStandings
export function index(req, res) {
  return ConstructorStanding.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single ConstructorStanding from the DB
export function show(req, res) {
  return ConstructorStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new ConstructorStanding in the DB
export function create(req, res) {
  return ConstructorStanding.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given ConstructorStanding in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return ConstructorStanding.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing ConstructorStanding in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return ConstructorStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a ConstructorStanding from the DB
export function destroy(req, res) {
  return ConstructorStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
