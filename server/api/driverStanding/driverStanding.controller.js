/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/driverStandings              ->  index
 * GET     /api/driverStandings/:id          ->  show
 */

'use strict';

import Response from '../../components/response';
import {DriverStanding} from '../../sqldb';

// Gets a list of DriverStandings
export function index(req, res) {
  return DriverStanding.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

// Gets a single DriverStanding from the DB
export function show(req, res) {
  return DriverStanding.find({
    where: {
      _id: req.params.id
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
