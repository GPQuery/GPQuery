/**
 * Constructor model events
 */

'use strict';

import {EventEmitter} from 'events';
var Constructor = require('../../sqldb').Constructor;
var ConstructorEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConstructorEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Constructor) {
  for(var e in events) {
    let event = events[e];
    Constructor.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConstructorEvents.emit(event + ':' + doc._id, doc);
    ConstructorEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Constructor);
export default ConstructorEvents;
