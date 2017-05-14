'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('lapTime', {
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
    lap: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    time: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    milliseconds: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'lapTimes'
  });
}
