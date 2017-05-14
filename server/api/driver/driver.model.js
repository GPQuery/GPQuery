'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('driver', {
    driverId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    driverRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    number: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(3),
      allowNull: true
    },
    forename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    surname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: true
    },
    nationality: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    }
  }, {
    tableName: 'drivers'
  });
}
