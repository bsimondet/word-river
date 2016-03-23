'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var WordPackSchema = new mongoose.Schema({
    name: String,
    isWordType: Boolean, //True means the context pack should be treated as a word type wordPack.
                         // Word type Word Packs automatically catch all tiles that are tagged with the name of the wordPack as their type.
                         //For example, creating a "Noun" word type wordPack through the Word manger page will give the user the option to add "Noun" as a type of word.
                         //When a word is given this tag, it will appear in the "Noun" Word type wordPack.
    creatorID: String, //The id of the creator of the wordPack
    words: [],
    public : Boolean
});

export default mongoose.model('WordPack', WordPackSchema);
