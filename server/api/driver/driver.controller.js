/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/drivers              ->  index
 * GET     /api/drivers/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Driver} from '../../sqldb';

// Gets a list of Drivers
export function index(req, res) {
  return Driver.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Driver from the DB
export function show(req, res) {
  return Driver.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
