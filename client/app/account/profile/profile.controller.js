'use strict';

class ProfileController {
  constructor($scope, $state, $window, currentuserdata, User, DogData, Timekit, Util) {
    this.errors = {};
    this.submitted = false;

    this.currentuserdata = currentuserdata;
    this.safeCb = Util.safeCb;
    this.$state = $state;
    this.$window = $window;
    this.User = User;
    this.DogData = DogData;
    this.Timekit = Timekit;

    $scope.$on('$stateChangeSuccess', () => {
      this.currentuserdata.getUserData()
        .then(userData => {
          console.log(userData);
          // this.usersDogs = userData.dogs;
          this.userInfo = {
            _id: userData._id,
            name: userData.name,
            email: userData.email,
            address: userData.address,
            telephone: userData.telephone,
            city: userData.city,
            state: userData.state,
            about: userData.about
          };
          return userData._id
        })
        .then((userID) => {
          DogData.getOwnDogs({ id: userID}).$promise
          .then((dogs) => {
            console.log(dogs);
            this.usersDogs = dogs;
          })
        })

    });

  }

  updateProfile(form, callback) {
    this.submitted = true;
    console.log(form);
    if (form.$valid) {
      this.User.updateProfile({ id: this.userInfo._id}, {
        user: this.userInfo
      }, () => {
        return this.safeCb(callback)(null);
      }, (err) => {
        return this.safeCb(callback)(err);
      }).$promise
        .then((data) => {
          console.log(data.user);
          this.currentuserdata.updateUser(data.user);
          this.message = 'Profile successfully updated.';
          this.$state.reload();
        })
        .catch(() => {
          this.errors.other = 'Something went wrong!';
          this.message = '';
        })
    }
  }

  connectTimekit() {
    // this.Timekit.createAccount();
    this.$window.open('https://api.timekit.io/v2/accounts/google/signup?Timekit-App=barknb&callback=http://localhost:9000/api/timekit/callback', 'Timekit Auth', 'height=600,width=400');
    // console.log(this.$window);
  }

}

angular.module('barKnBApp')
  .controller('ProfileController', ProfileController);
