'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('pitStop', {
    raceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    driverId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    stop: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    lap: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'pitStops'
  });
}
