'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ContextPackSchema = new mongoose.Schema({
  name: String,
  creatorID: String, //The id of the creator of the wordPack
  wordPacks: [],
  public : Boolean
});

export default mongoose.model('ContextPack', ContextPackSchema);
