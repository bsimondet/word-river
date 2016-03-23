/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/students              ->  index
 * POST    /api/students              ->  create
 * GET     /api/students/:id          ->  show
 * PUT     /api/students/:id          ->  update
 * DELETE  /api/students/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Student from './student.model';

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

// Gets a list of Students
export function index(req, res) {
  Student.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Student from the DB
export function show(req, res) {
  Student.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Student in the DB
export function create(req, res) {
  Student.createAsync(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Student in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Student.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Student from the DB
export function destroy(req, res) {
  Student.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export function getUserStudents(req,res) {
  Student.find({teachers: req.params.creatorID}, function(err, students) {
    if(err) { return handleError(res, err); }
    return res.json(200, students);
  });
}

export function updateTags(req, res) {
  // deletes _id in req body to not screw things up...
  if(req.body._id){ delete req.body._id }

  // Uses _id provided in request (url) to find pack in database
  Student.findById(req.params.id, function(err, users) {
    // Handle Errors
    if(err){return handleError(res, err) }
    if(!users){ return res.send(404) }

    // Merging request body and pack from DB. Special callback for arrays!
    var updated = _.merge(users, req.body, function(a, b) {
      if(_.isArray(a)) {
        //return arrayUnique(a.concat(b));
        return b;
      } else {
        // returning undefined lets _.merge use its default merging methods, rather than this callback.
        return undefined;
      }
    });

    // Saves to database
    updated.save(function(err){
      if(err){ console.log(err);return handleError(res, err); }
      return res.json(200, users);
    });
  });
}

// Updates an existing thing in the DB.
export function editStudent(req, res) {
  var userId = req.body.studentID;
  var fn = req.body.firstName;
  var ln = req.body.lastName;

  Student.findById(userId, function (err, student) {
    student.firstName = fn;
    student.lastName = ln;
    student.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

//Not finished--Working Here!
export function assignToClass(req, res) {
  var userId = req.params.id;
  var classID = req.body.classID;
  var groupList = req.body.groupList;
  Student.findById(userId, function (err, user) {
    user.classList.push({
      "_id": classID,
      "groupList": groupList
    });
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

export function assignToGroup(req, res) {
  var userId = req.body.studentID;
  var classID = req.body.classID;
  var groupID = req.body.groupID;
  Student.findById(userId, function (err, user) {
    var allClassIDs = [];
    for(var i = 0; i < user.classList.length; i++){
      allClassIDs.push(user.classList[i]._id);
      if(classID == user.classList[i]._id){
        user.classList[i].groupList.push(groupID);
      }
    }
    if(allClassIDs.indexOf(classID) == -1){
      user.classList.push({
        "_id": classID,
        "groupList": groupID
      });
    }
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

export function addWord(req, res) {
  var userId = req.params.id;
  var word = req.body.word;
  console.log(packId);
  Student.findById(userId, function (err, user) {

    user.words.push(word);

    user.save(function(err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

export function removeClass(req, res) {
  var userId = req.body._id;
  var classID = req.body.classID;
  Student.findById(userId, function (err, user) {
    for (var i = 0; i < user.classList.length; i++) {
      if (user.classList[i]._id == classID) {
        user.classList.splice(i, 1);
      }
    }
    user.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}

export function removeGroup(req, res) {
  var userId = req.body.studentID;
  var classID = req.body.classID;
  var groupID = req.body.groupID;

  Student.findById(userId, function (err, user) {
    for (var i = 0; i < user.classList.length; i++) {
      if(user.classList[i]._id == classID){
        for (var j = 0; j < user.classList[i].groupList.length; j++) {
          if (user.classList[i].groupList[j] == groupID) {
            user.classList[i].groupList.splice(j, 1);
          }
        }
      }
    }
    user.save(function (err) {
      if (err) return validationError(res, err);
      res.send(200);
    });
  });
}
