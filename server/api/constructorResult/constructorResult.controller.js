/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructorResults              ->  index
 * GET     /api/constructorResults/:id          ->  show
 */

'use strict';

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
