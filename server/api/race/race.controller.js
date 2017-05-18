/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/races              ->  index
 * GET     /api/races/:id          ->  show
 * GET     /api/races/:year        ->  getSeason
 */

'use strict';

import Response from '../../components/response';
import {
  Race,
  Circuit,
  Result,
  Driver,
  Constructor,
  Status
} from '../../sqldb';

const currentYear = new Date().getFullYear();
const maxRound = 20;


/**
 * Gets a list of Races
 *
 * @param {number} [req.params.year] - Race season.
 * @param {number} [req.params.round] - Race round.
 * @returns {Promise}
 */
export function index(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Circuit,
    as: 'circuit'
  }];

  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }

  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  return Race.findAll({
    where: whereObj,
    include: includeArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Race from the DB
 *
 * @param {number} [req.params.year] - Race season.
 * @param {number} [req.params.round] - Race round.
 * @returns {Promise}
 */
export function show(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Circuit,
    as: 'circuit'
  }];

  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }

  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  return Race.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets Race Results
 *
 * @todo
 * I've no idea why the `Constructor` model does not work in the nested `include`, but
 * I'm temporarily using `.then()` to query it.
 */
export function results(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Circuit,
    as: 'circuit'
  }, {
    model: Result,
    as: 'results',
    include: [{
      model: Driver,
      as: 'driver'
    }, {
      model: Constructor,
      as: 'constructor'
    }, {
      model: Status,
      as: 'status'
    }]
  }];

  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }

  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  console.log('\n\n\n');
  console.log(req);
  console.log('\n\n\n');
  console.log(res);
  console.log('\n\n\n');

  return Race.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
