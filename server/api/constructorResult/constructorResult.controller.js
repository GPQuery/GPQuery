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
import {ConstructorResult} from '../../sqldb';

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

// Gets a list of ConstructorResults
export function index(req, res) {
  return ConstructorResult.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single ConstructorResult from the DB
export function show(req, res) {
  return ConstructorResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ConstructorResult in the DB
export function create(req, res) {
  return ConstructorResult.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
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
    .then(respondWithResult(res))
    .catch(handleError(res));
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
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ConstructorResult from the DB
export function destroy(req, res) {
  return ConstructorResult.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
