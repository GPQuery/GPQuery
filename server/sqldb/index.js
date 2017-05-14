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
db.Season = db.sequelize.import('../api/season/season.model');
db.Result = db.sequelize.import('../api/result/result.model');
db.Race = db.sequelize.import('../api/race/race.model');
db.PitStop = db.sequelize.import('../api/pitStop/pitStop.model');
db.LapTime = db.sequelize.import('../api/lapTime/lapTime.model');
db.DriverStanding = db.sequelize.import('../api/driverStanding/driverStanding.model');
db.ConstructorStanding = db.sequelize.import('../api/constructorStanding/constructorStanding.model');
db.Constructor = db.sequelize.import('../api/constructor/constructor.model');
db.ConstructorResult = db.sequelize.import('../api/constructorResult/constructorResult.model');
db.Circuit = db.sequelize.import('../api/circuit/circuit.model');
db.Qualifying = db.sequelize.import('../api/qualifying/qualifying.model');
db.Status = db.sequelize.import('../api/status/status.model');
db.Flag = db.sequelize.import('../api/flag/flag.model');
db.Driver = db.sequelize.import('../api/driver/driver.model');

module.exports = db;
