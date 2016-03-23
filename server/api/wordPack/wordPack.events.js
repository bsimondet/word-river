/**
 * WordPack model events
 */

'use strict';

import {EventEmitter} from 'events';
var WordPack = require('./wordPack.model');
var WordPackEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WordPackEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  WordPack.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WordPackEvents.emit(event + ':' + doc._id, doc);
    WordPackEvents.emit(event, doc);
  }
}

export default WordPackEvents;
