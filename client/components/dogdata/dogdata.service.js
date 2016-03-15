'use strict';



(function() {

function DogResource(Auth, $resource) {
  return dogsResource = $resource('/api/dogs/:id/:controller', {
    id: '@_id'
  }, {
    updateDog: {
      method:'PUT',
      params: {
        controller: 'updateDog'
      }
    },
  });
}

angular.module('barKnBApp')
  .factory('dogdata', DogResource);

})();
