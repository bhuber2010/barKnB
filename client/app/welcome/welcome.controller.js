'use strict';

(function() {

class WelcomeComponent {

  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
    // this.awesomeThings = [];

    // $scope.$on('$destroy', function() {
    //   socket.unsyncUpdates('thing');
    // });
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent
  });

})();
