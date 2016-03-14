'use strict';

angular.module('barKnBApp')
  .service('currentuserdata', function () {

    var loggedInUser = {};

    var setUser = (user) => {
      loggedInUser = user;
    }


    return {
      setUser: setUser,
    }

  });
