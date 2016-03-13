'use strict';

class NewDogController {
  constructor(Auth, dashdata) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  submitDog(form) {
    this.submitted = true;

    if (form.$valid) {

    }
  }
}

angular.module('barKnBApp')
  .controller('NewDogController', NewDogController);
