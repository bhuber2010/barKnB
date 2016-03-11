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
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });

// (function($) {
// 
// $(document).ready(
//   $('body').scrollspy({
//       target: '.navbar-fixed-top',
//       offset: 60
//   })
// )
//
// })(jQuery);
