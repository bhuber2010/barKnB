'use strict';
(function(){

class CaretakerComponent {
  constructor(dashdata, DogData, $stateParams, lodash) {
    this.dashdata = dashdata;
    this.DogData = DogData;
    this.selectedBreed = '';
    console.log(dashdata.userMode.selectedMode, $stateParams.activity);
    console.log(dashdata.activities[$stateParams.activity]);

    this.DogData.getAllDogs().$promise
      .then(doglist => {
        this.dogs = doglist;
        return doglist;
      })
      .then(doglist => {
        console.log(doglist);
        var breeds = doglist.map((dog, i) => {
          return dog.breed.toUpperCase();
        })
        breeds = lodash(breeds).uniq().value();
        this.breeds = breeds
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
