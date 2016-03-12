'use strict';
(function(){

class DashboardComponent {
  constructor($state, dashdata) {
    this.dashdata = dashdata;
    this.message = 'Dashboard Search';
    this.userMode = dashdata.userMode;
  }
}


angular.module('barKnBApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'dash'
  });

})();
