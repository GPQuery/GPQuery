/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/status              ->  index
 * GET     /api/status/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Status} from '../../sqldb';

// Gets a list of Statuss
export function index(req, res) {
  return Status.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Status from the DB
export function show(req, res) {
  return Status.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
