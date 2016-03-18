(function(angular, undefined) {
'use strict';

angular.module('barKnBApp.constants', [])

.constant('appConfig', ['guest','user','admin'])

.constant('serverApi', 'http://localhost:9000')

;
})(angular);