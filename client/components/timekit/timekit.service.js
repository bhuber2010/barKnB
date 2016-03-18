'use strict';

(function() {

function TimeKitResource($resource) {
  return $resource('/api/timekit/:controller/:id', {
    id: 'id'
  }, {
    getRequests: {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'requests'
      }
    }
  });
}

angular.module('barKnBApp')
  .factory('Timekit', TimeKitResource);

})();
