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
      if (!foundUser.timekitcal) {
        var tkSync = unirest.post('https://api.timekit.io/v2/calendars');
        tkSync.headers({
          'Accept': 'application/json',
          'Timekit-App': 'barknb',
          'accept-encoding': 'gzip',
          'content-type': 'application/json'
        })
        tkSync.send({
          name: 'barknb',
          description: 'Doggy schedule',
          foregroundcolor: '#1d1d1d',
          backgroundcolor: '#cd74e6'
        })
        tkSync.auth(req.query.email, req.query.token, true);
        tkSync.end((calendar) => {
          console.log('calendar: ', calendar);
          foundUser.timekittoken = req.query.token;
          foundUser.timekitcal = calendar.body.data.id;
          foundUser.save();
          console.log(foundUser);
        });
      }
      
      return res.send("All good... you can close this window.");
    })
}

// Test
export function test(req, res) {
  console.log(req.query);
  return res.send(config.google.callbackURL);
}
