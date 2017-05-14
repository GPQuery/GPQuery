'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('race', {
    raceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    round: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    circuitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00'
    },
    time: {
      type: DataTypes.TIME,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'races'
  });
}
