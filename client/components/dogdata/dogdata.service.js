'use strict';

(function() {

function DogResource($resource) {
  return $resource('/api/dogs/:id/:controller', {
    id: '@_id'
  }, {
    getAllDogs: {
      method: 'GET',
      isArray: true,
      params: {
        controller: null,
        id: null
      }
    },
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
    },
    removeDog: {
      method: 'DELETE',
      params: {null}
    }
  });
}

angular.module('barKnBApp')
  .factory('DogData', DogResource);

})();
