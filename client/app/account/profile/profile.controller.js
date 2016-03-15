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
      this.userData = this.currentuserdata.getUserData();
      this.userInfo = {
        _id: this.userData._id,
        name: this.userData.name,
        email: this.userData.email,
        address: this.userData.address,
        telephone: this.userData.telephone,
        city: this.userData.city,
        state: this.userData.state,
        about: this.userData.about
      };
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
      }, () => {
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
