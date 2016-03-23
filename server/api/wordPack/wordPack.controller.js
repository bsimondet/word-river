/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wordPacks              ->  index
 * POST    /api/wordPacks              ->  create
 * GET     /api/wordPacks/:id          ->  show
 * PUT     /api/wordPacks/:id          ->  update
 * DELETE  /api/wordPacks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import WordPack from './wordPack.model';

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

// Gets a list of WordPacks
export function index(req, res) {
  WordPack.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single WordPack from the DB
export function show(req, res) {
  WordPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new WordPack in the DB
export function create(req, res) {
  WordPack.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing WordPack in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  WordPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a WordPack from the DB
export function destroy(req, res) {
  WordPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Updates an existing contextPack in the DB.
export function removeWordIDFromWordPack(req, res) {
  var wordPackId = req.params.id;
  var wordID = req.body.wordID;

  WordPack.findById(wordPackId, function (err, wordPack) {
    for(var i = 0; i < wordPack.words.length; i++){
      if( wordPack.words[i] == wordID){
        wordPack.words.splice(i, 1);
      }
    }
    wordPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

// Updates an existing contextPack in the DB.
export function editWordPackName(req, res) {
  var wordPackId = req.params.id;
  var newName = req.body.name;

  WordPack.findById(wordPackId, function (err, wordPack) {
    wordPack.name = newName;
    wordPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

// Updates an existing contextPack in the DB.
export function addWordToWordPack(req, res) {
  var wordPackId = req.params.id;
  var wordID = req.body.wordID;

  WordPack.findById(wordPackId, function (err, wordPack) {
    wordPack.words.push(wordID);
    wordPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

export function getUserWordPacks(req,res) {
  WordPack.find({creatorID: req.params.creatorID}, function(err, WordPacks) {
    if(err) { return handleError(res, err); }
    return res.json(200, WordPacks);
  });
};
