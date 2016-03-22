'use strict';
(function(){

class ScheduleComponent {
  constructor($stateParams, $window, DogData, currentuserdata) {
    this.$stateParams = $stateParams;
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
            this.duration = this.durationCheck($stateParams.activity).duration;
            this.view = this.durationCheck($stateParams.activity).view;
            this.widget.init({
              name: dog.owner_user.name,
              email: dog.owner_user.email,
              apiToken: dog.owner_user.timekittoken,
              calendar: dog.owner_user.timekitcal,
              avatar: dog.owner_user.google.image.url,
              fullCalendar: {
                defaultView: this.view,
                allDaySlot: true
              },
              bookingGraph: 'confirm_decline',
              timekitConfig: {
                app: 'barknb'
              },
              timekitFindTime: {
                ignore_all_day_events: true,
                length: this.duration
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
                  placeholder: 'Comment (optional)',
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

  durationCheck(activity) {
    if (activity === 'dogwalk') {
      return {duration: '2 hour', view: 'basicWeek'}
    } else if (activity === 'shortcare') {
      return {duration: '1 day', view: 'month'}
    } else {
      return {duration: '1 week', view: 'month'}
    }
  }

}

angular.module('barKnBApp')
  .component('schedule', {
    templateUrl: 'app/dashboard/schedule/schedule.html',
    controller: ScheduleComponent,
    controllerAs: 'schedule'
  });

})();
