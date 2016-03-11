'use strict';

angular.module('barKnBApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        template: '<main></main>'
      });
  });
