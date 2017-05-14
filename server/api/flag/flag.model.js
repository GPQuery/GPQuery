'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('flag', {
    flagId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    country: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    demonym: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    iso2: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    iso3: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'flags'
  });
}
