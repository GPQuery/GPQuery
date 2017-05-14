'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('season', {
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '',
      unique: true
    }
  }, {
    tableName: 'seasons'
  });
}
