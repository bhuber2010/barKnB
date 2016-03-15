'use strict';

angular.module('barKnBApp')
  .service('currentuserdata', function (Auth, User) {

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

    var getUser = () => {
      setUser(Auth.getCurrentUser());
      return loggedInUser
    } ;

    return {
      setUser: setUser,
      getUserData: getUser,
      updateUser: updateUser
    }

  });
