'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('country', {
    countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    demonym: DataTypes.STRING,
    iso2: DataTypes.STRING
  });
}
