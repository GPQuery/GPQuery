/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/pitStops              ->  index
 * GET     /api/pitStops/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {PitStop} from '../../sqldb';

// Gets a list of PitStops
export function index(req, res) {
  return PitStop.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single PitStop from the DB
export function show(req, res) {
  return PitStop.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
