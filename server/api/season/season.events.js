/**
 * Season model events
 */

'use strict';

import {EventEmitter} from 'events';
var Season = require('../../sqldb').Season;
var SeasonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SeasonEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Season) {
  for(var e in events) {
    let event = events[e];
    Season.hook(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc, options, done) {
    SeasonEvents.emit(event + ':' + doc._id, doc);
    SeasonEvents.emit(event, doc);
    done(null);
  };
}

registerEvents(Season);
export default SeasonEvents;
