'use strict';
(function(){

class DashboardComponent {
  constructor($state, $document, dashdata) {
    this.dashdata = dashdata;
    this.message = 'Dashboard Search';
    this.userMode = dashdata.userMode;
    $document.find('body').removeClass('prelogin').addClass('tint');
  }
}


angular.module('barKnBApp')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.html',
    controller: DashboardComponent,
    controllerAs: 'dash'
  });

})();
