(function(angular, undefined) {
'use strict';

angular.module('barKnBApp.constants', [])

.constant('appConfig', ['guest','user','admin'])

.constant('serverApi', 'https://barknb.herokuapp.com')

;
})(angular);