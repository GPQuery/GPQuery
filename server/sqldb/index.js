/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

// http://sequelize.readthedocs.io/en/latest/api/sequelize/
var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.database, config.sequelize.user, config.sequelize.secret, config.sequelize.options)
  //sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Flag = db.sequelize.import('../api/flag/flag.model');
db.Driver = db.sequelize.import('../api/driver/driver.model');

module.exports = db;
