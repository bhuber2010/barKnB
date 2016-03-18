'use strict';

class RequestController {
  constructor($scope, $state, $stateParams, currentuserdata, Timekit) {
    this.errors = {};

    this.Timekit = Timekit;
    this.currentuserdata = currentuserdata;
    this.$state = $state;
    this.$stateParams = $stateParams;

    $scope.$on('$stateChangeSuccess', () => {

      this.Timekit.getRequests({id: this.$stateParams.id}).$promise
        .then(requests => {
          console.log(requests);
          this.requests = requests;
        })

    });

    actionType(action) {
      return action === 'decline' ? 'btn-danger' : 'btn-success';
    }

  }

}

angular.module('barKnBApp')
  .controller('RequestController', RequestController);
