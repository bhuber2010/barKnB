'use strict';
(function(){

class CaretakerComponent {
  constructor(dashdata, DogData, $stateParams) {
    this.dashdata = dashdata;
    this.DogData = DogData;
    console.log(dashdata.userMode.selectedMode, $stateParams.activity);
    console.log(dashdata.activities[$stateParams.activity]);

    this.DogData.getAllDogs().$promise
      .then((doglist) => {
        console.log(doglist);
        this.dogs = doglist;
      })
  }
}

angular.module('barKnBApp')
  .component('caretaker', {
    templateUrl: 'app/dashboard/caretaker/caretaker.html',
    controller: CaretakerComponent,
    controllerAs: 'ct'
  });

})();
