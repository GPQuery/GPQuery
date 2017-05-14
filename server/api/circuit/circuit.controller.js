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
import {Circuit} from '../../sqldb';

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

// Gets a list of Circuits
export function index(req, res) {
  return Circuit.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Circuit from the DB
export function show(req, res) {
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Circuit in the DB
export function create(req, res) {
  return Circuit.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
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
    .then(respondWithResult(res))
    .catch(handleError(res));
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
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Circuit from the DB
export function destroy(req, res) {
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
