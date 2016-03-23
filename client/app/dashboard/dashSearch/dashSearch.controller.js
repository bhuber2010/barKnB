'use strict';
(function(){

class DashSearchComponent {
  constructor(dashdata, $stateParams) {
    this.dashdata = dashdata;
  }
}

angular.module('barKnBApp')
  .component('dashSearch', {
    templateUrl: 'app/dashboard/dashSearch/dashSearch.html',
    controller: DashSearchComponent,
    controllerAs: 'dashsearch'
  });

})();
