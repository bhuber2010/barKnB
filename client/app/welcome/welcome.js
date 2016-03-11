'use strict';

angular.module('barKnBApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('welcome', {
        url: '/',
        template: '<welcome></welcome>'
      });
  });
