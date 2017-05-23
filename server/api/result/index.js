'use strict';

var express = require('express');
var controller = require('./result.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:resultId', controller.show);

module.exports = router;
