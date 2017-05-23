/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/results/:year/:round ->  index
 * GET     /api/results/:resultId    ->  show
 */

'use strict';

import Response from '../../components/response';
import {
  Result,
  Race
} from '../../sqldb';

const currentYear = new Date().getFullYear();
const maxRound = 20;


/**
 * Gets a list of Results
 *
 * @returns {Promise}
 */
export function index(req, res) {
  return Result.findAll()
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Result from the DB
 *
 * @returns {Promise}
 */
export function show(req, res) {
  return Result.find({
    where: {
      resultId: req.params.resultId
    }
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
