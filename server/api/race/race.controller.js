/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/races              ->  index
 * GET     /api/races/:id          ->  show
 * GET     /api/races/:year        ->  getSeason
 */

'use strict';

import _ from 'lodash';
import Response from '../../components/response';
import {
  Race,
  Circuit,
  Result,
  Driver,
  Constructor,
  Status,
  Flag
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
    as: 'Circuit',
    include: [{
      model: Flag,
      as: 'Flag'
    }]
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
    as: 'Circuit',
    include: [{
      model: Flag,
      as: 'Flag'
    }]
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
 * @param {number} [req.params.year] - Race season.
 * @param {number} [req.params.round] - Race round.
 * @returns {Promise}
 */
export function results(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Circuit,
    as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
    }]
  }, {
    model: Result,
    as: 'Results',
    include: [{
      model: Driver,
      as: 'Driver'
    }, {
      model: Status,
      as: 'Status'
    }, {
      model: Constructor,
      as: 'Constructor'
    }]
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
