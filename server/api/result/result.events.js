/**
 * Result model events
 */

'use strict';

import {EventEmitter} from 'events';
var Result = require('../../sqldb').Result;
var ResultEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ResultEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Result) {
  for(var e in events) {
    let event = events[e];
    Result.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ResultEvents.emit(event + ':' + doc._id, doc);
    ResultEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Result);
export default ResultEvents;
