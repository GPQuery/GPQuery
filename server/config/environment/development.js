'use strict';
/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connection opions
  sequelize: {
    database: process.env.SEQUELIZE_DATABASE,
    user: process.env.SEQUELIZE_USER,
    secret: process.env.SEQUELIZE_SECRET,
    options: {
      logging: console.log,
      host: process.env.SEQUELIZE_HOST,
      port: process.env.SEQUELIZE_PORT,
      define: {
        timestamps: false,
        underscored: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
