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
import {DriverStanding} from '../../sqldb';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      // eslint-disable-next-line prefer-reflect
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of DriverStandings
export function index(req, res) {
  return DriverStanding.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single DriverStanding from the DB
export function show(req, res) {
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new DriverStanding in the DB
export function create(req, res) {
  return DriverStanding.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
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
    .then(respondWithResult(res))
    .catch(handleError(res));
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
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a DriverStanding from the DB
export function destroy(req, res) {
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
