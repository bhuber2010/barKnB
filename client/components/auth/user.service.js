'use strict';

(function() {

function UserResource($resource) {
  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    updateProfile: {
      method: 'PUT',
      params: {
        controller: 'profile'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}

angular.module('barKnBApp.auth')
  .factory('User', UserResource);

})();
