'use strict';

angular.module('barKnBApp')
  .factory('dogdata', function (Auth, $resource) {

    var dogsResource = $resource('/api/dogs/:id', {id: '@_id'}, {'get': {method:'GET'}});


    // Public API here
    return {
      dogsResource: dogsResource
    };
  });
