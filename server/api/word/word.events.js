/**
 * Word model events
 */

'use strict';

import {EventEmitter} from 'events';
var Word = require('./word.model');
var WordEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WordEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Word.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WordEvents.emit(event + ':' + doc._id, doc);
    WordEvents.emit(event, doc);
  }
}

export default WordEvents;
