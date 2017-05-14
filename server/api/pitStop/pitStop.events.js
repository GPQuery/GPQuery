/**
 * PitStop model events
 */

'use strict';

import {EventEmitter} from 'events';
var PitStop = require('../../sqldb').PitStop;
var PitStopEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PitStopEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(PitStop) {
  for(var e in events) {
    let event = events[e];
    PitStop.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    PitStopEvents.emit(event + ':' + doc._id, doc);
    PitStopEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(PitStop);
export default PitStopEvents;
