'use strict';

(function() {

function DogResource($resource) {
  return $resource('/api/dogs/:id/:controller', {
    id: '@_id'
  }, {
    getOwnDogs: {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'getOwnDogs'
      }
    },
    updateDog: {
      method: 'PUT',
      params: {
        controller: 'updateDog'
      }
    }
  });
}

angular.module('barKnBApp')
  .factory('DogData', DogResource);

})();
