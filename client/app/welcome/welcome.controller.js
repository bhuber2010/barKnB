'use strict';

(function() {

class WelcomeComponent {

  constructor($scope, $document, $http, socket) {
    this.$http = $http;
    this.socket = socket;

    $scope.$on('$stateChangeSuccess', () => {
      $document.find('body').removeClass('tint')
    })
  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent
  });

})();
