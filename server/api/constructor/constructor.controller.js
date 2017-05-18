/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructors              ->  index
 * GET     /api/constructors/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {Constructor} from '../../sqldb';

// Gets a list of Constructors
export function index(req, res) {
  return Constructor.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single Constructor from the DB
export function show(req, res) {
  return Constructor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
