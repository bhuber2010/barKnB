(function(angular, undefined) {
'use strict';

angular.module('barKnBApp.constants', [])

.constant('appConfig', {userRoles:['guest','user','admin']});
// .constant('serverApi' 'https://barknb.herokuapp.com');
.constant('serverApi' 'http://localhost:9000')

})(angular);
