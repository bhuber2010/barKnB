'use strict';
(function(){

class ScheduleComponent {
  constructor($stateParams, $window, DogData, currentuserdata) {
    this.TimekitBooking = $window.TimekitBooking;
    this.DogData = DogData;
    this.currentuserdata = currentuserdata;
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
        this.currentuserdata.getUserData()
          .then(currentUser => {
            this.widget.init({
              name: dog.owner_user.name,
              email: dog.owner_user.email,
              apiToken: dog.owner_user.timekittoken,
              calendar: dog.owner_user.timekitcal,
              avatar: dog.owner_user.google.image.url,
              fullCalendar: {
                defaultView: 'basicWeek'
              },
              bookingGraph: 'confirm_decline',
              timekitConfig: {
                app: 'barknb'
              },
              timekitFindTime: {
                ignore_all_day_events: true
              },
              timekitCreateBooking: {
                graph: 'confirm_decline'
              },
              bookingFields: {
                name: {
                  placeholder: 'Full name',
                  prefilled: currentUser.name,
                  locked: false
                },
                email: {
                  placeholder: 'E-mail',
                  prefilled: currentUser.email,
                  locked: false
                },
                phone: {
                  enabled: true,
                  placeholder: 'Phone number',
                  prefilled: currentUser.telephone,
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
                  placeholder: 'Leave a comment (optional)',
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
