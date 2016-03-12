/**
 * Dog model events
 */

'use strict';

import {EventEmitter} from 'events';
var Dog = require('./dog.model');
var DogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DogEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Dog.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DogEvents.emit(event + ':' + doc._id, doc);
    DogEvents.emit(event, doc);
  }
}

export default DogEvents;
