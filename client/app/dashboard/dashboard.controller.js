'use strict';
(function(){

class DashboardComponent {
  constructor($state, dashdata) {
    this.message = 'Dashboard Search';
    this.test = dashdata.test;
  }
}

angular.module('barKnBApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'dash'
  });

})();
