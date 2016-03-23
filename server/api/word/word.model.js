'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WordSchema = new mongoose.Schema({
  name: String,
  wordType: String,
  userCreated: Boolean
});

export default mongoose.model('Word', WordSchema);
