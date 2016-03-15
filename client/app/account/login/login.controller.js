'use strict';

class LoginController {
  constructor(Auth, $state, $http, currentuserdata) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$http = $http;
    this.$state = $state;
    this.currentuserdata = currentuserdata;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        this.currentuserdata.setUser(this.Auth.getCurrentUser());
        this.$state.go('dashboard');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}

angular.module('barKnBApp')
  .controller('LoginController', LoginController);
