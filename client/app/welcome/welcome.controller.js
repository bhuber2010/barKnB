'use strict';

(function() {

class WelcomeComponent {

  constructor($state, $rootScope, $location, $document, $http, socket, Auth) {
    this.$http = $http;
    this.$rootScope = $rootScope;
    this.socket = socket;
    this.Auth = Auth;
    this.loginState();

    $document.find('body').removeClass('tint').addClass('prelogin')

    $rootScope.$on('$locationChangeSuccess', () => {
      this.loginState();
    })

  }

  loginState() {
    var currentState = new Promise((resolve, reject) => {
      this.Auth.isLoggedIn((what) => resolve(what))
    })
    currentState.then(state => {
      console.log('state: ', state);
      this.loggedIn = state;
    })
  }

}

angular.module('barKnBApp')
  .component('welcome', {
    templateUrl: 'app/welcome/welcome.html',
    controller: WelcomeComponent,
    controllerAs: 'welcome'
  });

})();
