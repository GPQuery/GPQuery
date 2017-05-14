/**
 * Circuit model events
 */

'use strict';

import {EventEmitter} from 'events';
var Circuit = require('../../sqldb').Circuit;
var CircuitEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CircuitEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Circuit) {
  for(var e in events) {
    let event = events[e];
    Circuit.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    CircuitEvents.emit(event + ':' + doc._id, doc);
    CircuitEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Circuit);
export default CircuitEvents;
