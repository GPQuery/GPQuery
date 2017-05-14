/**
 * Qualifying model events
 */

'use strict';

import {EventEmitter} from 'events';
var Qualifying = require('../../sqldb').Qualifying;
var QualifyingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
QualifyingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Qualifying) {
  for(var e in events) {
    let event = events[e];
    Qualifying.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    QualifyingEvents.emit(event + ':' + doc._id, doc);
    QualifyingEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Qualifying);
export default QualifyingEvents;
