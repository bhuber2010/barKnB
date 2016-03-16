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
      apiToken: 'q1myahTdpaEsDlE59r8Jq5YL7Ze84OWc',
      // apiToken: 'kD3hE2IrcgV7Qal92k8Y2392dqU65Xb9',
      calendar: '7e633362-716a-4f23-bb35-9fcda204b1a4',
      avatar: 'https://lh6.googleusercontent.com/-ePoHAHPfVgE/AAAAAAAAAAI/AAAAAAAAF-Q/beBK7juwGZ0/photo.jpg',
      fullCalendar: {
        defaultView: 'basicWeek'
      },
      timekitConfig: {
        app: 'barknb'
      },
      timekitFindTime: {
        ignore_all_day_events: true
      },
      bookingFields: {
        name: {
          placeholder: 'Full name',
          prefilled: false,
          locked: false
        },
        email: {
          placeholder: 'E-mail',
          prefilled: false,
          locked: false
        },
        phone: {
          enabled: true,
          placeholder: 'Phone number',
          prefilled: false,
          required: false,
          locked: false
        },
        location: {
          enabled: true,
          placeholder: 'Location',
          prefilled: false,
          required: false,
          locked: false
        },
        comment: {
          enabled: true,
          placeholder: 'Comment',
          prefilled: false,
          required: false,
          locked: false
        }
      },
      callbacks: {
        createBookingSuccessful: (data) => {
          console.log('createBookingSuccessful', data)
        }
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
