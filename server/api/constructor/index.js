'use strict';

var express = require('express');
var controller = require('./constructor.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:constructorRef', controller.show);

module.exports = router;
