/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/circuits              ->  index
 * GET     /api/circuits/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Circuit} from '../../sqldb';

// Gets a list of Circuits
export function index(req, res) {
  return Circuit.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Circuit from the DB
export function show(req, res) {
  return Circuit.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
