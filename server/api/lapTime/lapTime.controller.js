/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lapTimes              ->  index
 * GET     /api/lapTimes/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {LapTime} from '../../sqldb';

// Gets a list of LapTimes
export function index(req, res) {
  return LapTime.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single LapTime from the DB
export function show(req, res) {
  return LapTime.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
