'use strict';

(function() {

function TimeKitResource($resource) {
  return $resource('/api/timekit/:controller/:id/:action/:requestID', {
    id: 'id'
  }, {
    getRequests: {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'requests'
      }
    },
    takeAction: {
      method: 'GET',
      params: {
        controller: 'request_action'
      }
    }
  });
}

angular.module('barKnBApp')
  .factory('Timekit', TimeKitResource);

})();
