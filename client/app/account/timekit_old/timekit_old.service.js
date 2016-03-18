'use strict';

(function() {
  function TimekitResource($resource) {
    return $resource('https://api.timekit.io/v2/:location/:type/:what', {
      location: 'accounts'
    }, {
      createAccount: {
        method:'GET',
        params: {
          location: 'accounts',
          type: 'google',
          what: 'signup',
          'Timekit-App':'barknb',
          callback: 'http://localhost:9000/api/timekit/callback'
        }
      },
      getGcals: {
        method:'GET',
        params: {
          location: 'accounts',
          type: 'google',
          what: 'calendars'
        }
      },
      getRequests: {
        method:'GET',
        headers: {
          // Authorization: `Basic ${Base64.encode( ${username} : ${password})}`
        },
        params: {
          location: 'bookings'
        }
      }
    });
  }

angular.module('barKnBApp')
  .service('Timekit_old', TimekitResource);

})()
