/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/seasons              ->  index
 * GET     /api/seasons/:year        ->  show
 */

'use strict';

import Response from '../../components/response';
import {
  Season,
  Race,
  Circuit,
  Flag
} from '../../sqldb';

const currentYear = new Date().getFullYear();


/**
 * Gets a list of Seasons
 *
 * @returns {Promise}
 */
export function index(req, res) {
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  return Season.findAll({
    include: includeArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Season from the DB
 *
 * @param {number} [req.params.year] - Season.
 * @returns {Promise}
 */
export function show(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  if (req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  };

  return Season.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a list of Races for Season
 *
 * @param {number} [req.params.year] - Season.
 * @returns {Promise}
 */
export function getRaceSchedule(req, res) {
  var whereObj = {
    year: req.params.year
  };
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  if (req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  };

  return Season.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}



/**
 * Gets a list of Race Results for Season
 *
 * @param {number} [req.params.year] - Season.
 * @returns {Promise}
 */
export function getRaceResults(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  if (req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  };

  return Season.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a list of Driver Standings for Season
 *
 * @param {number} [req.params.year] - Season.
 * @returns {Promise}
 */
export function getDriverStandings(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  if (req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  };

  return Season.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a list of Driver Standings for Season
 *
 * @param {number} [req.params.year] - Season.
 * @returns {Promise}
 */
export function getConstructorStandings(req, res) {
  var whereObj = {};
  var includeArr = [{
    model: Race,
    as: 'Races',
    include: [{
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }]
  }];

  if (req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  };

  return Season.find({
    where: whereObj,
    include: includeArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
