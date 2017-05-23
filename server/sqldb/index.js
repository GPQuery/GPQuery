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

// Result Default Scope
db.Result.addScope('defaultScope', {
  include: [{
    model: db.Status,
    as: 'Status'
  }]
}, { override: true });

// Circuit-Race Relation
db.Circuit.hasMany(db.Race, {
  foreignKey:  'circuitId',
  as:          'Races'
});

// Race-Circuit Relation
db.Race.belongsTo(db.Circuit, {
  foreignKey:  'circuitId',
  as:          'Circuit'
});

// Race-Result Relation
db.Race.hasMany(db.Result, {
  foreignKey:  'raceId',
  as:          'Results'
});

// Result-Race Relation
db.Result.belongsTo(db.Race, {
  foreignKey:  'raceId',
  as:          'Race'
});

// Driver-Result Relation
db.Driver.hasMany(db.Result, {
  foreignKey:  'driverId',
  as:          'Results'
});

// Result-Driver Relation
db.Result.belongsTo(db.Driver, {
  foreignKey:  'driverId',
  as:          'Driver'
});

// Constructor-Result Relation
db.Constructor.hasMany(db.Result, {
  foreignKey:  'constructorId',
  as:          'Results'
});

// Result-Constructor Relation
db.Result.belongsTo(db.Constructor, {
  foreignKey:  'constructorId',
  as:          'Constructor'
});

// Status-Result Relation
db.Status.hasMany(db.Result, {
  foreignKey:  'statusId',
  as:          'Results'
});

// Result-Status Relation
db.Result.belongsTo(db.Status, {
  foreignKey:  'statusId',
  as:          'Status'
});

// Driver-Results-Constructor Relation
db.Driver.belongsToMany(db.Constructor, {
  through:    db.Result,
  as:         'Constructors',
  foreignKey: 'driverId',
  otherKey:   'constructorId'
});

// Constructor-Results-Driver Relation
db.Constructor.belongsToMany(db.Driver, {
  through:    db.Result,
  as:         'Drivers',
  foreignKey: 'constructorId',
  otherKey:   'driverId'
});


/**
 * Flag Relations
 *
 * @description
 * All Sequelize relations with the `Flag` model.
 *
 * Considering removing altogether and replacing with client-side Angular filter.
 */
// Flag-Circuit Relation
db.Flag.hasMany(db.Circuit, {
  foreignKey: 'country',
  sourceKey:  'country',
  as:         'Flags'
});

// Circuit-Flag Relation
db.Circuit.belongsTo(db.Flag, {
  foreignKey: 'country',
  targetKey:  'country',
  as:         'Flag'
});

// Flag-Constructor Relation
db.Flag.hasMany(db.Constructor, {
  foreignKey: 'nationality',
  sourceKey:  'demonym',
  as:         'Flags'
});

// Constructor-Flag Relation
db.Constructor.belongsTo(db.Flag, {
  foreignKey: 'nationality',
  targetKey:  'demonym',
  as:         'Flag'
});

// Flag-Driver Relation
db.Flag.hasMany(db.Driver, {
  foreignKey: 'nationality',
  sourceKey:  'demonym',
  as:         'Flags'
});

// Driver-Flag Relation
db.Driver.belongsTo(db.Flag, {
  foreignKey: 'nationality',
  targetKey:  'demonym',
  as:         'Flag'
});

module.exports = db;
