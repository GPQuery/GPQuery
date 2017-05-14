/**
 * LapTime model events
 */

'use strict';

import {EventEmitter} from 'events';
var LapTime = require('../../sqldb').LapTime;
var LapTimeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LapTimeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(LapTime) {
  for(var e in events) {
    let event = events[e];
    LapTime.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    LapTimeEvents.emit(event + ':' + doc._id, doc);
    LapTimeEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(LapTime);
export default LapTimeEvents;
