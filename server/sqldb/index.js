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


//  Relations
// ------------------------------

/**
 * Season-Race Relation
 *
 * @description
 * `Season` hasMany `Race` as `Races` with key `year`
 */
db.Season.hasMany(db.Race, {
  foreignKey:   'year',
  sourceKey:    'year',
  as:           'Races'
});

/**
 * Race-Season Relation
 *
 * @description
 * `Race` belongsTo `Season` as `Season` with key `year`
 */
db.Race.belongsTo(db.Season, {
  foreignKey:   'year',
  sourceKey:    'year',
  as:           'Season'
});

/**
 * Circuit-Race Relation
 *
 * @description
 * `Circuit` hasMany `Race` as `Races` with key `circuitId`
 */
db.Circuit.hasMany(db.Race, {
  foreignKey:  'circuitId',
  as:          'Races'
});

/**
 * Race-Circuit Relation
 *
 * @description
 * `Race` belongsTo `Circuit` as `Circuit` with key `circuitId`
 */
db.Race.belongsTo(db.Circuit, {
  foreignKey:  'circuitId',
  as:          'Circuit'
});

/**
 * Race-Result Relation
 *
 * @description
 * `Race` hasMany `Result` as `Results` with key `raceId`
 */
db.Race.hasMany(db.Result, {
  foreignKey:  'raceId',
  as:          'Results'
});

/**
 * Result-Race Relation
 *
 * @description
 * `Result` belongsTo `Race` as `Race` with key `raceId`
 */
db.Result.belongsTo(db.Race, {
  foreignKey:  'raceId',
  as:          'Race'
});

/**
 * Driver-Result Relation
 *
 * @description
 * `Driver` hasMany `Result` as `Results` with key `driverId`
 */
db.Driver.hasMany(db.Result, {
  foreignKey:  'driverId',
  as:          'Results'
});

/**
 * Result-Driver Relation
 *
 * @description
 * `Result` belongsTo `Driver` as `Driver` with key `driverId`
 */
db.Result.belongsTo(db.Driver, {
  foreignKey:  'driverId',
  as:          'Driver'
});

/**
 * Constructor-Result Relation
 *
 * @description
 * `Constructor` hasMany `Result` as `Results` with key `constructorId`
 */
db.Constructor.hasMany(db.Result, {
  foreignKey:  'constructorId',
  as:          'Results'
});

/**
 * Result-Constructor Relation
 *
 * @description
 * `Result` belongsTo `Constructor` as `Constructor` with key `constructorId`
 */
db.Result.belongsTo(db.Constructor, {
  foreignKey:  'constructorId',
  as:          'Constructor'
});

/**
 * Status-Result Relation
 *
 * @description
 * `Status` hasMany `Result` as `Results` with key `statusId`
 */
db.Status.hasMany(db.Result, {
  foreignKey:  'statusId',
  as:          'Results'
});

/**
 * Result-Status Relation
 *
 * @description
 * `Result` belongsTo `Status` as `Status` with key `statusId`
 */
db.Result.belongsTo(db.Status, {
  foreignKey:  'statusId',
  as:          'Status'
});

/**
 * Driver-Constructor Relation
 *
 * `Driver` belongsToMany `Constructor` through `Results` as `Constructors`
 * with keys `driverId` and `constructorId`
 */
//db.Driver.belongsToMany(db.Constructor, {
//  through:    db.Result,
//  as:         'Constructors',
//  foreignKey: 'driverId',
//  otherKey:   'constructorId'
//});

/**
 * Constructor-Driver Relation
 *
 * `Constructor` belongsToMany `Driver` through `Results` as `Drivers`
 * with keys `constructorId` and `driverId`
 */
//db.Constructor.belongsToMany(db.Driver, {
//  through:    db.Result,
//  as:         'Drivers',
//  foreignKey: 'constructorId',
//  otherKey:   'driverId'
//});

/**
 * Race-Qualifying Relation
 *
 * @description
 * `Race` hasMany `Qualifying` as `QualifyingResults` with key `raceId`
 */
db.Race.hasMany(db.Qualifying, {
  foreignKey:  'raceId',
  as:          'QualifyingResults'
});

/**
 * Qualifying-Race Relation
 *
 * @description
 * `Qualifying` belongsTo `Race` as `Race` with key `raceId`
 */
db.Qualifying.belongsTo(db.Race, {
  foreignKey:  'raceId',
  as:          'Race'
});

/**
 * Driver-Qualifying Relation
 *
 * @description
 * `Driver` hasMany `Qualifying` as `QualifyingResults` with key `driverId`
 */
db.Driver.hasMany(db.Qualifying, {
  foreignKey:  'driverId',
  as:          'QualifyingResults'
});

/**
 * Qualifying-Driver Relation
 *
 * @description
 * `Qualifying` belongsTo `Driver` as `Driver` with key `driverId`
 */
db.Qualifying.belongsTo(db.Driver, {
  foreignKey:  'driverId',
  as:          'Driver'
});

/**
 * Constructor-Qualifying Relation
 *
 * @description
 * `Constructor` hasMany `Qualifying` as `QualifyingResults` with key `constructorId`
 */
db.Constructor.hasMany(db.Qualifying, {
  foreignKey:  'constructorId',
  as:          'QualifyingResults'
});

/**
 * Qualifying-Constructor Relation
 *
 * @description
 * `Qualifying` belongsTo `Constructor` as `Constructor` with key `constructorId`
 */
db.Qualifying.belongsTo(db.Constructor, {
  foreignKey:  'constructorId',
  as:          'Constructor'
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
