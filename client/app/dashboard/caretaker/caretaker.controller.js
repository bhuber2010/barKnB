'use strict';
(function(){

class CaretakerComponent {
  constructor(dashdata, $stateParams) {
    this.dashdata = dashdata;
    console.log(dashdata.userMode.selectedMode, $stateParams.activity);
    console.log(dashdata.activities[$stateParams.activity]);
  }
}

angular.module('barKnBApp')
  .component('caretaker', {
    templateUrl: 'app/dashboard/caretaker/caretaker.html',
    controller: CaretakerComponent,
    controllerAs: 'ct'
  });

})();
