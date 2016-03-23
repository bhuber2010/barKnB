'use strict';

(function() {

class WelcomeComponent {

  constructor($state, $rootScope, $document, $http, socket, Auth) {
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.socket = socket;
    this.Auth = Auth;

    $document.find('body').removeClass('tint').addClass('prelogin')

    $rootScope.loggedIn = Auth.isLoggedIn();

    console.log($rootScope.loggedIn);

  }

  $onInit() {
    this.$rootScope.loggedIn = this.Auth.isLoggedIn();
  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent,
    controllerAs: 'welcome'
  });

})();
