/**
 * ContextPack model events
 */

'use strict';

import {EventEmitter} from 'events';
var ContextPack = require('./contextPack.model');
var ContextPackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ContextPackEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ContextPack.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    ContextPackEvents.emit(event + ':' + doc._id, doc);
    ContextPackEvents.emit(event, doc);
  }
}

export default ContextPackEvents;
