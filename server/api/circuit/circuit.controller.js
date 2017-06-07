/**
 * Circuit Controller
 *
 * @description
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/circuits              ->  index
 * GET     /api/circuits/:circuitRef  ->  show
 */

'use strict';

import Response from '../../components/response';
import {
  Circuit,
  Flag
} from '../../sqldb';

/**
 * Gets a list of Circuits
 *
 * @returns {Promise}
 */
export function index(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  return Circuit.findAll({
    include: includeArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}

/**
 * Gets a single Circuit from the DB
 *
 * @param {number} [req.params.circuitRef] - Circuit reference string.
 * @returns {Promise}
 */
export function show(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  // Ensure `circuitRef` value is valid
  whereObj.circuitRef = req.params.circuitREf

  return Circuit.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
