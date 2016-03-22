'use strict';

class RequestController {
  constructor($scope, $window, $document, $state, $stateParams, currentuserdata, Timekit) {
    this.errors = {};

    this.Timekit = Timekit;
    this.currentuserdata = currentuserdata;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.noRequests = false;
    this.moment = $window.moment;

    $document.find('body').removeClass('prelogin').addClass('tint');

    $scope.$on('$stateChangeSuccess', () => {
      this.loadRequests();
      this.loadEvents();
    });

  }

  loadRequests() {
    this.Timekit.getRequests({id: this.$stateParams.id}).$promise
      .then(requests => {
        console.log(requests);
        this.requests = requests;
        if (requests.length === 0) {
          this.noRequests = 'You currently have no reuqests';
        }
      })
  }

  loadEvents() {
    this.Timekit.getEvents({id: this.$stateParams.id}, {start: this.moment.utc(Date.now()).format(), end: this.moment.utc(Date.now()).add(2, 'weeks').format()}).$promise
      .then(events => {
        console.log(events);
        this.events = events;
        if (events.length === 0) {
          this.noEvents = 'What...? Your dogs schedule is wide open!';
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
