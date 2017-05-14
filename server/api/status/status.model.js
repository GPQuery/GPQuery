'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('status', {
    statusId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'status'
  });
}
