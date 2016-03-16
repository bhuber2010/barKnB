'use strict';
(function(){

class ScheduleComponent {
  constructor($stateParams, DogData) {
    this.DogData = DogData;

    this.DogData.get({ id: $stateParams.id}).$promise
      .then((dog) => {
        console.log(dog);
        this.dog = {
          name: dog.name,
          breed: dog.breed,
          photo: dog.photo,
          bio: dog.bio,
          shot: dog.shot,
          vet_contact: dog.vet_contact
        };
      })

  }
}

angular.module('barKnBApp')
  .component('schedule', {
    templateUrl: 'app/dashboard/schedule/schedule.html',
    controller: ScheduleComponent,
    controllerAs: 'schedule'
  });

})();
