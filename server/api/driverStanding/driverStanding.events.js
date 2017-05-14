/**
 * DriverStanding model events
 */

'use strict';

import {EventEmitter} from 'events';
var DriverStanding = require('../../sqldb').DriverStanding;
var DriverStandingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DriverStandingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(DriverStanding) {
  for(var e in events) {
    let event = events[e];
    DriverStanding.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    DriverStandingEvents.emit(event + ':' + doc._id, doc);
    DriverStandingEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(DriverStanding);
export default DriverStandingEvents;
