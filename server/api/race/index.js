'use strict';

var express = require('express');
var controller = require('./race.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:year', controller.index);
router.get('/:year/:round', controller.show);
router.get('/:year/:round/results', controller.results);

module.exports = router;
