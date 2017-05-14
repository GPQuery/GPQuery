'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('circuit', {
    circuitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    circuitRef: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    alt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    }
  }, {
    tableName: 'circuits'
  });
}
