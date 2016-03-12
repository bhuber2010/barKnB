'use strict';

angular.module('barKnBApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashSearch', {
        url: '/dashboard/search',
        template: '<dash-search></dash-search>'
      });
  });
