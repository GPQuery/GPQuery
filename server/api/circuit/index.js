'use strict';

var express = require('express');
var controller = require('./circuit.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:circuitRef', controller.show);

module.exports = router;
