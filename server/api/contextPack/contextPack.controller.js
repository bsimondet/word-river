/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contextPacks              ->  index
 * POST    /api/contextPacks              ->  create
 * GET     /api/contextPacks/:id          ->  show
 * PUT     /api/contextPacks/:id          ->  update
 * DELETE  /api/contextPacks/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import ContextPack from './contextPack.model';

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

// Gets a list of ContextPacks
export function index(req, res) {
  ContextPack.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function getUserContextPacks(req,res) {
  ContextPack.find({creatorID: req.params.creatorID}, function(err, contextPack) {
    if(err) { return handleError(res, err); }
    return res.json(200, contextPack);
  });
}

// Gets a single ContextPack from the DB
export function show(req, res) {
  ContextPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new ContextPack in the DB
export function create(req, res) {
  ContextPack.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing ContextPack in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ContextPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a ContextPack from the DB
export function destroy(req, res) {
  ContextPack.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Updates an existing contextPack in the DB.
export function editContextName(req, res) {
  var contextId = req.params.id;
  var newName = req.body.name;

  ContextPack.findById(contextId, function (err, contextPack) {
    contextPack.name = newName;
    contextPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

var validationError = function(res, err) {
  return res.json(422, err);
}

// Updates an existing contextPack in the DB.
export function addWordPackToContextPack(req, res) {
  var contextId = req.params.id;
  var wordPackID = req.body.wordPackID;

  ContextPack.findById(contextId, function (err, contextPack) {
    contextPack.wordPacks.push(wordPackID);
    contextPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

// Updates an existing contextPack in the DB.
export function removeWordPackFromContextPack(req, res) {
  var contextId = req.params.id;
  var wordPackID = req.body.wordPackID;

  ContextPack.findById(contextId, function (err, contextPack) {
    for(var i = 0; i < contextPack.wordPacks.length; i++){
      if(contextPack.wordPacks[i] == wordPackID){
        contextPack.wordPacks.splice(i, 1);
      }
    }
    contextPack.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

// Deletes a contextPack from the DB.
export function destroy(req, res) {
  ContextPack.findById(req.params.id, function (err, contextPack) {
    if(err) { return handleError(res, err); }
    if(!contextPack) { return res.send(404); }
    contextPack.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
}
