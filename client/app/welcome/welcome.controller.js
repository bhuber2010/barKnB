'use strict';

(function() {

class WelcomeComponent {

  constructor($state, $document, $http, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.Auth = Auth;

    $document.find('body').removeClass('tint').addClass('prelogin')

    this.loggedIn = Auth.isLoggedIn();

  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent,
    controllerAs: 'welcome'
  });

})();
