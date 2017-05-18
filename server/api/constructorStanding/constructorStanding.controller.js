/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructorStandings              ->  index
 * GET     /api/constructorStandings/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {ConstructorStanding} from '../../sqldb';

// Gets a list of ConstructorStandings
export function index(req, res) {
  return ConstructorStanding.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single ConstructorStanding from the DB
export function show(req, res) {
  return ConstructorStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
