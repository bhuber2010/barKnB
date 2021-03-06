'use strict';
(function(){

class DashSearchComponent {
  constructor(dashdata, $stateParams) {
    this.dashdata = dashdata;
    console.log(dashdata.userMode.selectedMode, $stateParams.activity);
    console.log(dashdata.activities[$stateParams.activity]);
  }
}

angular.module('barKnBApp')
  .component('dashSearch', {
    templateUrl: 'app/dashboard/dashSearch/dashSearch.html',
    controller: DashSearchComponent,
    controllerAs: 'dashsearch'
  });

})();
