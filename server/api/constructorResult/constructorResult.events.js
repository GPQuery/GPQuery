/**
 * ConstructorResult model events
 */

'use strict';

import {EventEmitter} from 'events';
var ConstructorResult = require('../../sqldb').ConstructorResult;
var ConstructorResultEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConstructorResultEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ConstructorResult) {
  for(var e in events) {
    let event = events[e];
    ConstructorResult.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConstructorResultEvents.emit(event + ':' + doc._id, doc);
    ConstructorResultEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(ConstructorResult);
export default ConstructorResultEvents;
