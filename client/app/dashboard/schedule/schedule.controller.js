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

    this.widget = new TimekitBooking();
    this.widget.init({
      name: 'Brian',
      email: 'bhuber@alumni.colostate.edu',
      apiToken: 'S2oK9czO8wdgQjGFvQxgufWaJgs3rkSL',
      calendar: '7e633362-716a-4f23-bb35-9fcda204b1a4',
      avatar: 'https://lh6.googleusercontent.com/-ePoHAHPfVgE/AAAAAAAAAAI/AAAAAAAAF-Q/beBK7juwGZ0/photo.jpg',
      timekitFindTime: {
        ignore_all_day_events: true
      }
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
