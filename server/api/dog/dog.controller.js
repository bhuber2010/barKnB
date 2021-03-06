/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/dogs              ->  index
 * POST    /api/dogs              ->  create
 * GET     /api/dogs/:id          ->  show
 * PUT     /api/dogs/:id          ->  update
 * DELETE  /api/dogs/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Dog from './dog.model';

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
    console.log('merged: ', updated);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
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

// Gets a list of Dogs
export function index(req, res) {
  return Dog.find().populate('owner_user').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a list of current users Dogs
export function indexUser(req, res) {
  return Dog.find({ owner_user: req.params.id }).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Dog from the DB
export function show(req, res) {
  return Dog.findById(req.params.id).populate('owner_user').exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Dog in the DB
export function create(req, res) {
  console.log(req.body);
  return Dog.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Dog in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Dog.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Dog from the DB
export function destroy(req, res) {
  return Dog.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
