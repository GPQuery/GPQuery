/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below

  app.use('/api/constructors', require('./api/constructor'));
  app.use('/api/constructorResults', require('./api/constructorResult'));
  app.use('/api/constructorStandings', require('./api/constructorStanding'));

  app.use('/api/drivers', require('./api/driver'));
  app.use('/api/results', require('./api/result'));
  app.use('/api/driverStandings', require('./api/driverStanding'));

  app.use('/api/seasons', require('./api/season'));
  //app.use('/api/flags', require('./api/flag'));
  app.use('/api/circuits', require('./api/circuit'));
  app.use('/api/races', require('./api/race'));

  app.use('/api/status', require('./api/status'));
  app.use('/api/qualifying', require('./api/qualifying'));

  app.use('/api/lapTimes', require('./api/lapTime'));
  app.use('/api/pitStops', require('./api/pitStop'));

  app.use('/api/', require('./api/race'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
