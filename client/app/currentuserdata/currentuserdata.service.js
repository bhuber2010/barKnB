'use strict';

angular.module('barKnBApp')
  .service('currentuserdata', function () {

    var loggedInUser = {};

    var setUser = (user) => {
      loggedInUser = user;
      console.log(loggedInUser);
    }

    var updateUser = (newData) => {
      var newDataKeys = Object.keys(newData);
      newDataKeys.forEach((key) => {
        if (key !== '_id') {
          loggedInUser[key] = newData[key];
        }
      })
    }

    var getUser = () => loggedInUser;

    return {
      setUser: setUser,
      getUserData: getUser,
      updateUser: updateUser
    }

  });
