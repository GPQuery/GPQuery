/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/flags              ->  index
 * GET     /api/flags/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Flag} from '../../sqldb';

// Gets a list of Flags
export function index(req, res) {
  return Flag.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Flag from the DB
export function show(req, res) {
  return Flag.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
