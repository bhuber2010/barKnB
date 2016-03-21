'use strict';

(function() {

class WelcomeComponent {

  constructor($scope, $document, $http, socket) {
    this.$http = $http;
    this.socket = socket;

    $document.find('body').removeClass('tint').addClass('prelogin')

    $scope.$on('$stateChangeSuccess', () => {
      
    })
  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent
  });

})();
