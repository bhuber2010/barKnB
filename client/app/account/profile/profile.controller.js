'use strict';

class ProfileController {
  constructor($scope, $state, Auth, dashdata, currentuserdata, User, Util) {
    this.errors = {};
    this.submitted = false;

    this.currentuserdata = currentuserdata;
    this.safeCb = Util.safeCb;
    this.$state = $state;
    this.Auth = Auth;
    this.User = User;

    $scope.$on('$stateChangeSuccess', () => {
      this.currentuserdata.getUserData()
        .then(userData => {
          console.log(userData);
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
}

angular.module('barKnBApp')
  .controller('ProfileController', ProfileController);
