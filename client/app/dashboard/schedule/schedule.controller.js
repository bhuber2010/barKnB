'use strict';
(function(){

class ScheduleComponent {
  constructor($stateParams, $window, DogData) {
    this.TimekitBooking = $window.TimekitBooking;
    this.DogData = DogData;
    this.widget = new this.TimekitBooking();

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
        this.widget.init({
          name: dog.owner_user.name,
          email: dog.owner_user.email,
          apiToken: dog.owner_user.timekittoken,
          calendar: dog.owner_user.timekitcal,
          avatar: dog.owner_user.google.image.url,
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
