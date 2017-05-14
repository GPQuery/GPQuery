/**
 * ConstructorStanding model events
 */

'use strict';

import {EventEmitter} from 'events';
var ConstructorStanding = require('../../sqldb').ConstructorStanding;
var ConstructorStandingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConstructorStandingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(ConstructorStanding) {
  for(var e in events) {
    let event = events[e];
    ConstructorStanding.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConstructorStandingEvents.emit(event + ':' + doc._id, doc);
    ConstructorStandingEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(ConstructorStanding);
export default ConstructorStandingEvents;
