/**
 * Flag model events
 */

'use strict';

import {EventEmitter} from 'events';
var Flag = require('../../sqldb').Flag;
var FlagEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FlagEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Flag) {
  for(var e in events) {
    let event = events[e];
    Flag.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    FlagEvents.emit(event + ':' + doc._id, doc);
    FlagEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Flag);
export default FlagEvents;
