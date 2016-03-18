'use strict';

import _ from 'lodash';
import unirest from 'unirest';
import User from '../user/user.model';
import Dog from '../dog/dog.model';
import config from '../../config/environment';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}



// Save timekit account details to User
export function saveAccount(req, res) {
  return User.findOne({ email: req.query.email }).exec()
    .then((foundUser) => {
      var tkSync = unirest.get('https://api.timekit.io/v2/accounts/sync');
      tkSync.headers({
        'Accept': 'application/json',
        'Timekit-App': 'barknb',
        'accept-encoding': 'gzip'
      })
      tkSync.auth(req.query.email, req.query.token, true);
      tkSync.end((res) => {
        console.log(res);
        var tkCal = unirest.get('https://api.timekit.io/v2/calendars');
        tkCal.headers({
          'Accept': 'application/json',
          'Timekit-App': 'barknb',
          'accept-encoding': 'gzip'
        })
        tkCal.auth(req.query.email, req.query.token, true);
        tkCal.end((response) => {
          foundUser.timekittoken = req.query.token;
          foundUser.timekitcal = response.body.data[0].id;
          foundUser.save();
          console.log(foundUser);
        });
      });

      return res.send("All good... you can close this window.");
    })
}

// Test
export function test(req, res) {
  console.log(req.query);
  return res.send(config.google.callbackURL);
}
