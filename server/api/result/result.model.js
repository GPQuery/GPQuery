'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('result', {
    resultId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    raceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    driverId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    constructorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    grid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    positionText: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    positionOrder: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: '0'
    },
    laps: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    fastestLap: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    rank: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    fastestLapTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fastestLapSpeed: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    statusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'results'
  });
}
