'use strict';

class SettingsController {
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
      this.userSettings = {
        _id: this.userData._id,
        owner: this.userData.settings.owner,
        searchradius: this.userData.settings.search_radius,
        now: this.userData.settings.available_now,
        calendar: this.userData.settings.calendar_public,
        accstatus: this.userData.settings.acnt_active
      };
    });
  }

  updateSettings(form, callback) {
    this.submitted = true;
    if (form.$valid) {
      console.log(form);
    }
  }

}

angular.module('barKnBApp')
  .controller('SettingsController', SettingsController);
