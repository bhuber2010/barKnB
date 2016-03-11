'use strict';

angular.module('barKnBApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        template: '<dashboard></dashboard>',
        authenticate: 'user'
      });
  });
