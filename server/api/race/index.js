'use strict';

var express = require('express');
var controller = require('./race.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:year/races', controller.getByYear);

router.get('/:year/:round', controller.show);

router.get('/:year/:round/results', controller.getResults);

router.get('/:year/:round/qualifying', controller.getQualifyingResults);

module.exports = router;
