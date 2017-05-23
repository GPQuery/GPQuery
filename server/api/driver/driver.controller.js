/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/drivers              ->  index
 * GET     /api/drivers/:driverRef   ->  show
 */

'use strict';

import Response from '../../components/response';
import {
  Driver,
  Flag,
  Constructor
} from '../../sqldb';


/**
 * Gets a list of Drivers
 *
 * @returns {Promise}
 */
export function index(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  return Driver.findAll({
    include: includeArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Driver from the DB
 *
 * @param {string} [req.params.driverRef] - Driver reference string.
 * @returns {Promise}
 */
export function show(req, res) {
  var whereObj = {
    driverRef: req.params.driverRef
  };
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  return Driver.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets Driver Race Results
 *
 * @param {string} [req.params.driverRef] - Driver reference string.
 * @returns {Promise}
 */
export function results(req, res) {
  var whereObj = {
    driverRef: req.params.driverRef
  };
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }, {
    model: Constructor,
    as: 'Constructors'
  }];

  return Driver.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
