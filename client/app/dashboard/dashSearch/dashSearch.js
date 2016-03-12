'use strict';

angular.module('barKnBApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashSearch', {
        url: '/dashboard/search/:mode/:activity',
        templateProvider: function($stateParams){
          if ($stateParams.mode === 'care') {
            return '<caretaker></caretaker>'
          } else {
            return '<dash-search></dash-search>'
          }
        }
      });
  });
