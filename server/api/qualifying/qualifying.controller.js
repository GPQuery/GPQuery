/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/qualifying              ->  index
 * GET     /api/qualifying/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Qualifying} from '../../sqldb';

// Gets a list of Qualifyings
export function index(req, res) {
  return Qualifying.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Qualifying from the DB
export function show(req, res) {
  return Qualifying.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
