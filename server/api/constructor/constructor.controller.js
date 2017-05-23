/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/constructors                  ->  index
 * GET     /api/constructors/:constructorRef  ->  show
 */

'use strict';

import Response from '../../components/response';
import {
  Constructor,
  Flag
} from '../../sqldb';


/**
 * Gets a list of Constructors
 *
 * @returns {Promise}
 */
export function index(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  return Constructor.findAll({
    include: includeArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Constructor from the DB
 *
 * @param {string} [req.params.constructorRef] - Constructor reference string.
 * @returns {Promise}
 */
export function show(req, res) {
  var whereObj = {
    constructorRef: req.params.constructorRef
  };
  var includeArr = [{
    model: Flag,
    as: 'Flag'
  }];

  return Constructor.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
