'use strict';

(function() {
  function TimekitResource($resource) {
    return $resource('https://api.timekit.io/v2/:location/:type/:what', {
      location: 'accounts',
      'Timekit-App':'barknb',
      callback: 'http://localhost:9000/api/timekit/callback'
    }, {
      createAccount: {
        method:'GET',
        params: {
          location: 'accounts',
          type: 'google',
          what: 'signup'
        }
      },
      getGcals: {
        method:'GET',
        params: {
          location: 'accounts',
          type: 'google',
          what: 'calendars'
        }
      }
    });
  }

angular.module('barKnBApp')
  .service('Timekit', TimekitResource);

})()
