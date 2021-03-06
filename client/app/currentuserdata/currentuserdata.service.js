'use strict';

angular.module('barKnBApp')
  .service('currentuserdata', function (Auth) {

    var loggedInUser = {};

    var setUser = (user) => {
      loggedInUser = user;
    }

    var updateUser = (newData) => {
      var newDataKeys = Object.keys(newData);
      newDataKeys.forEach((key) => {
        if (key !== '_id') {
          loggedInUser[key] = newData[key];
        }
      })
    }

    var updateUserSettings = (newData) => {
      var newDataKeys = Object.keys(newData);
      newDataKeys.forEach((key) => {
        if (key !== '_id') {
          loggedInUser.settings[key] = newData[key];
        }
      })
    }

    var getUser = () => {
      var data = Auth.getCurrentUser(null)
      return data
          .then((userData) => {
            loggedInUser = userData;
            return userData
          })
    };

    return {
      setUser: setUser,
      getUserData: getUser,
      updateUser: updateUser,
      updateUserSettings: updateUserSettings
    }

  });
