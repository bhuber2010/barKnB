'use strict';

angular.module('barKnBApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('schedule', {
        url: '/schedule/:id/:activity',
        template: '<schedule></schedule>',
        authenticate: 'user'
      });
  });
