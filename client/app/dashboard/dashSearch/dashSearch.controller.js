'use strict';
(function(){

class DashSearchComponent {
  constructor(dashdata) {
    this.message = 'Hello';
    this.test = dashdata.test;
  }
}

angular.module('barKnBApp')
  .component('dashSearch', {
    templateUrl: 'app/dashboard/dashSearch/dashSearch.html',
    controller: DashSearchComponent,
    controllerAs: 'dashsearch'
  });

})();
