'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('constructorResult', {
    constructorResultsId: {
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
    constructorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    points: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'constructorResults'
  });
}
