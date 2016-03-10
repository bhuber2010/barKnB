'use strict';

angular.module('barKnBApp.auth', [
  'barKnBApp.constants',
  'barKnBApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
