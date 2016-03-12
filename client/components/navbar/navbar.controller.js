'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'welcome'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $window, $rootScope) {
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

  }

  $onInit() {
    this.boolChangeClass = this.$rootScope.boolChangeClass;
  }


}

angular.module('barKnBApp')
  .controller('NavbarController', NavbarController);
