'use strict';

angular.module('barKnBApp', [
  'barKnBApp.auth',
  'barKnBApp.admin',
  'barKnBApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'toggle-switch',
  'frapontillo.bootstrap-switch',
  'flow',
  'angularMoment',
  'ngLodash'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })

  .run(function($rootScope, $window){

    // $rootScope.boolChangeClass = true;
    $rootScope.$apply(function(){
      if ($window.pageYOffset >= 80) {
          $rootScope.boolChangeClass = false;
      } else {
          $rootScope.boolChangeClass = true;
      }
    })

  })
