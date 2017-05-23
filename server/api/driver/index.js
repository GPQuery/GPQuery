'use strict';

var express = require('express');
var controller = require('./driver.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:driverRef', controller.show);

module.exports = router;
