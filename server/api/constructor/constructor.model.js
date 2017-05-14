'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('constructor', {
    constructorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    constructorRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'constructors'
  });
}
