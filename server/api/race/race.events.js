/**
 * Race model events
 */

'use strict';

import {EventEmitter} from 'events';
var Race = require('../../sqldb').Race;
var RaceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RaceEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Race) {
  for(var e in events) {
    let event = events[e];
    Race.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    RaceEvents.emit(event + ':' + doc._id, doc);
    RaceEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Race);
export default RaceEvents;
