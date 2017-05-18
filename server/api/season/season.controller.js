/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/seasons              ->  index
 * GET     /api/seasons/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Season} from '../../sqldb';

// Gets a list of Seasons
export function index(req, res) {
  return Season.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Season from the DB
export function show(req, res) {
  return Season.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
