/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/words              ->  index
 * POST    /api/words              ->  create
 * GET     /api/words/:id          ->  show
 * PUT     /api/words/:id          ->  update
 * DELETE  /api/words/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Word from './word.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Words
export function index(req, res) {
  Word.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getUserWords(req,res) {
  Word.find({creatorID: req.params.creatorID}, function(err, words) {
    if(err) { return handleError(res, err); }
    return res.json(200, words);
  });
};

// Gets a single Word from the DB
export function show(req, res) {
  Word.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Word in the DB
export function create(req, res) {
  Word.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Word in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Word.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Word from the DB
export function destroy(req, res) {
  Word.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function removeFromWordPack(req, res, next) {
  //var userId = req.user._id;
  console.log("function called");
  var category = req.body.category;
  var wordId = req.body.wordId;
  Word.findById(wordId, function (err, word) {
    //console.log(word);
    for(var i = 0; i < word.wordPacks.length; i++){
      //console.log("for loop");
      if(word.wordPacks[i] == category){
        //console.log("splice me");
        word.wordPacks.splice(i,1);
      }
    }

    word.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
};
