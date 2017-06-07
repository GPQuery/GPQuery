'use strict';

var express = require('express');
var controller = require('./season.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:year', controller.show);

router.get('/schedule/:year', controller.getRaceSchedule);
router.get('/results/:year', controller.getRaceResults);
router.get('/driverStandings/:year', controller.getDriverStandings);
router.get('/constructorStandings/:year', controller.getConstructorStandings);

module.exports = router;
