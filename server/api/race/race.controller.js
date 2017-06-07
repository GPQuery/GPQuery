/**
 * Race Controller
 *
 * @description
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/races              ->  index
 * GET     /api/races/:year/:round ->  show
 * GET     /api/races/:year        ->  getByYear
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
  Flag,
  Qualifying
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
  var orderArr = [
    ['year', 'DESC'],
    ['round', 'ASC']
  ];
  var includeArr = [{
    model: Circuit,
    as: 'Circuit',
    include: [{
      model: Flag,
      as: 'Flag'
    }]
  }];

  return Race.findAll({
    where: whereObj,
    include: includeArr,
    order: orderArr
  })
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a list of Races by Year
 *
 * @param {number} [req.params.year] - Race season.
 * @returns {Promise}
 */
export function getByYear(req, res) {
  var whereObj = {};
  var orderArr = [
    ['year', 'DESC'],
    ['round', 'ASC']
  ];
  var includeArr = [{
    model: Circuit,
    as: 'Circuit',
    include: [{
      model: Flag,
      as: 'Flag'
    }]
  }];

  // Ensure `year` value is within bounds
  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }

  return Race.findAll({
    where: whereObj,
    include: includeArr,
    order: orderArr
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
  var orderArr = [
    ['year', 'DESC'],
    ['round', 'ASC']
  ];
  var includeArr = [{
    model: Circuit,
    as: 'Circuit',
    include: [{
      model: Flag,
      as: 'Flag'
    }]
  }];

  // Ensure `year` and `round` values are within bounds
  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }
  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  return Race.find({
    where: whereObj,
    include: includeArr,
    order: orderArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Race and its Results from the DB
 *
 * @param {number} [req.params.year] - Race season.
 * @param {number} [req.params.round] - Race round.
 * @returns {Promise}
 */
export function getResults(req, res) {
  var whereObj = {};
  var orderArr = [
    ['year', 'DESC'],
    ['round', 'ASC']
  ];
  var includeArr = [];

  includeArr.push(
    {
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }
  );

  includeArr.push(
    {
      model: Result,
      as: 'Results',
      include: [
        {
          model: Driver,
          as: 'Driver',
          include: [{
            model: Flag,
            as: 'Flag'
          }]
        },
        {
          model: Constructor,
          as: 'Constructor',
          include: [{
            model: Flag,
            as: 'Flag'
          }]
        },
        {
          model: Status,
          as: 'Status'
        }
      ],
      order: [
        ['Result', 'positionOrder', 'ASC']
      ]
    }
  );

  // Ensure `year` and `round` values are within bounds
  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }
  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  return Race.find({
    where: whereObj,
    include: includeArr,
    order: orderArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}


/**
 * Gets a single Race and its QualifyingResults from the DB
 *
 * @param {number} [req.params.year] - Race season.
 * @param {number} [req.params.round] - Race round.
 * @returns {Promise}
 */
export function getQualifyingResults(req, res) {
  var whereObj = {};
  var orderArr = [
    ['year', 'DESC'],
    ['round', 'ASC']
  ];
  var includeArr = [];

  includeArr.push(
    {
      model: Circuit,
      as: 'Circuit',
      include: [{
        model: Flag,
        as: 'Flag'
      }]
    }
  );

  includeArr.push(
    {
      model: Qualifying,
      as: 'QualifyingResults',
      include: [
        {
          model: Driver,
          as: 'Driver',
          include: [{
            model: Flag,
            as: 'Flag'
          }]
        },
        {
          model: Constructor,
          as: 'Constructor',
          include: [{
            model: Flag,
            as: 'Flag'
          }]
        }
      ],
      order: [
        ['Qualifying', 'position', 'ASC']
      ]
    }
  );

  // Ensure `year` and `round` values are within bounds
  if(req.params.year >= 1950 && req.params.year <= currentYear) {
    whereObj.year = req.params.year;
  }
  if(req.params.round >= 0 && req.params.round <= maxRound) {
    whereObj.round = req.params.round;
  }

  return Race.find({
    where: whereObj,
    include: includeArr,
    order: orderArr
  })
    .then(Response.handleEntityNotFound(res))
    .then(Response.respondWithResult(res))
    .catch(Response.handleError(res));
}
