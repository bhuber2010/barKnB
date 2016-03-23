'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'welcome'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth, $window, $rootScope, currentuserdata) {
    this.$window = $window;
    this.$rootScope = $rootScope;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.currentuserdata = currentuserdata;


  }

  $onInit() {
    this.boolChangeClass = this.$rootScope.boolChangeClass;

    this.currentuserdata.getUserData()
      .then(userData => {
        this.userInfo = {
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          address: userData.address,
          telephone: userData.telephone,
          city: userData.city,
          state: userData.state,
          about: userData.about
        }
      })
  }


}

angular.module('barKnBApp')
  .controller('NavbarController', NavbarController);
