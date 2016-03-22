'use strict';
(function(){

class CaretakerComponent {
  constructor(dashdata, DogData, $stateParams, lodash) {
    this.dashdata = dashdata;
    this.DogData = DogData;
    this.$stateParams = $stateParams;
    this.selectedBreed = '';
    this.selectedCity = '';
    this.selectedState = '';
    console.log(dashdata.userMode.selectedMode, $stateParams.activity);
    console.log(dashdata.activities[$stateParams.activity]);

    this.DogData.getAllDogs().$promise
      .then(doglist => {
        this.dogs = doglist;
        return doglist;
      })
      .then(doglist => {
        console.log(doglist);
        var cats = {
          breeds: [],
          cities: [],
          states: [],
        };
        doglist.forEach(dog => {
          if (!dog.owner_user.city) {
            dog.owner_user.city = 'Unknown';
          }
          if (!dog.owner_user.state) {
            dog.owner_user.state = 'Unknown';
          }
          cats.breeds.push(dog.breed.toUpperCase());
          cats.cities.push(dog.owner_user.city.toUpperCase());
          cats.states.push(dog.owner_user.state.toUpperCase());
        })

        this.breeds = lodash(cats.breeds).uniq().value();
        this.cities = lodash(cats.cities).uniq().value();
        this.states = lodash(cats.states).uniq().value();

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
