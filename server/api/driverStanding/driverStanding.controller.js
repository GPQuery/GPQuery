/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/driverStandings              ->  index
 * POST    /api/driverStandings              ->  create
 * GET     /api/driverStandings/:id          ->  show
 * PUT     /api/driverStandings/:id          ->  upsert
 * PATCH   /api/driverStandings/:id          ->  patch
 * DELETE  /api/driverStandings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Response from '../../components/response';
import {DriverStanding} from '../../sqldb';

// Gets a list of DriverStandings
export function index(req, res) {
  return DriverStanding.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single DriverStanding from the DB
export function show(req, res) {
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Creates a new DriverStanding in the DB
export function create(req, res) {
  return DriverStanding.create(req.body)
    .then(Response.respondWithResult(res, 201))
    .catch(Response.handleError(res));
}

// Upserts the given DriverStanding in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }

  return DriverStanding.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Updates an existing DriverStanding in the DB
export function patch(req, res) {
  if(req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Deletes a DriverStanding from the DB
export function destroy(req, res) {
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(Response.handleError(res));
}
