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
      this.currentuserdata.getUserData()
        .then(userData => {
          this.userSettings = {
            _id: userData._id,
            owner: userData.settings.owner,
            search_radius: userData.settings.search_radius,
            now: userData.settings.available_now,
            calendar_public: userData.settings.calendar_public,
            acnt_active: userData.settings.acnt_active
          };
        })
    });
  }

  updateSettings(form, callback) {
    this.submitted = true;
    if (form.$valid) {
      console.log(form);
      console.log(this.userSettings);
      this.User.updateUserSettings({id: this.userSettings._id}, {
        settings: this.userSettings
      }, () => {
        return this.safeCb(callback)(null);
      }, (err) => {
        return this.safeCb(callback)(err);
      }).$promise
        .then((data) => {
          console.log(data.settings);
          this.currentuserdata.updateUserSettings(data.settings);
          this.message = 'Settings successfully updated.';
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
  .controller('SettingsController', SettingsController);
