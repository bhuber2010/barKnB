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

// Take action on a Request
export function takeAction(req, res) {
  return User.findOne({ _id: req.params.id }).exec()
    .then(foundUser => {
      var tkAction = unirest.put(`https://api.timekit.io/v2/bookings/${req.params.requestID}/${req.params.action}`)
      tkAction.headers({
        'Accept': 'application/json',
        'Timekit-App': 'barknb',
        'accept-encoding': 'gzip',
        'content-type': 'application/json'
      })
      tkAction.send({});
      tkAction.auth(foundUser.email, foundUser.timekittoken, true);
      tkAction.end(confirmation => {
        console.log(confirmation);
        return res.json(confirmation);
      })
    })
}

// Get users Events
export function getEvents(req, res) {
  return User.findOne({ _id: req.params.id }).exec()
    .then(foundUser => {
      // var tkEvents = unirest.get(`https://api.timekit.io/v2/calendars/${foundUser.timekitcal}?include=events`);
      var tkEvents = unirest.get(`https://api.timekit.io/v2/events`);
      tkEvents.headers({
        'Accept': 'application/json',
        'Timekit-App': 'barknb',
        'accept-encoding': 'gzip',
      });
      tkEvents.query({
        start: req.body.start,
        end: req.body.end
      })
      tkEvents.auth(foundUser.email, foundUser.timekittoken, true);
      tkEvents.end(data => {
        console.log(data);
        res.json(data.body.data);
      })
    })

}

// Get requests for a user
export function getRequests(req, res) {
  return User.findOne({ _id: req.params.id }).exec()
    .then(foundUser => {
      var tkRequests = unirest.get('https://api.timekit.io/v2/bookings');
      tkRequests.headers({
        'Accept': 'application/json',
        'Timekit-App': 'barknb',
        'accept-encoding': 'gzip',
      });
      tkRequests.auth(foundUser.email, foundUser.timekittoken, true);
      tkRequests.end(requests => {
        requests = requests.body.data;
        console.log(requests);
        _.remove(requests, r => {
          if (r.completed === true || r.graph === 'instant' || r.possible_actions[0] === 'create') {
            return true;
          } else {
            return false;
          }
        });
        console.log(requests);
        res.json(requests);
      })
    })
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
  return res.send(config.google.callbackURL);
}
