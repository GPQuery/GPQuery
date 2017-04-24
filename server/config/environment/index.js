'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

/*function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}*/

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'gpquery-secret'
  },

  // Sequelize connection options
  sequelize: {
    database: process.env.SEQUELIZE_DATABASE,
    user: process.env.SEQUELIZE_USER,
    secret: process.env.SEQUELIZE_SECRET,
    options: {
      logging: console.log,
      host: process.env.SEQUELIZE_HOST || 'localhost',
      port: process.env.SEQUELIZE_PORT || '3306',
      define: {
        timestamps: false,
        underscored: false,
        engine: 'MyISAM'
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./shared'),
  require(`./${process.env.NODE_ENV}.js`) || {});
