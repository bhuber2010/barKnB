'use strict';

class RequestController {
  constructor($scope, $state, $stateParams, currentuserdata, Timekit) {
    this.errors = {};

    this.Timekit = Timekit;
    this.currentuserdata = currentuserdata;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.noRequests = false;

    $scope.$on('$stateChangeSuccess', () => {
      this.loadRequests();
    });

  }

  loadRequests() {
    this.Timekit.getRequests({id: this.$stateParams.id}).$promise
      .then(requests => {
        console.log(requests);
        this.requests = requests;
        if (requests.length === 0) {
          this.noRequests = "You currently have no reuqests";
        }
      })
  }

  confirmRequest(action, requestNum) {
    this.Timekit.takeAction({id: this.$stateParams.id, action: action, requestID: requestNum}).$promise
      .then(confirmation => {
        console.log(confirmation);
        this.loadRequests();
      })
  }

  actionType(action) {
    return action === 'decline' ? 'btn-danger' : 'btn-success';
  }

}

angular.module('barKnBApp')
  .controller('RequestController', RequestController);
