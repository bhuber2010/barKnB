'use strict';

angular.module('barKnBApp')
  .service('dashdata', function ($state) {

    var userMode = {
      selectedMode: 'care',
      care: {
        name: 'care',
        state: false
      },
      need: {
        name: 'need',
        state: true
      }
    };

    var activities = {
      dogwalk: {
        id: 'dogwalk',
        name: 'Dog Walking',
        thumbnail: '../assets/images/dog-walk.jpeg',
        details: '"Fido just wants to play"'
      },
      shortcare: {
        id: 'shortcare',
        name: 'Short-term Care',
        thumbnail: '../assets/images/dog-sitting.jpg',
        details: '"We\'re out for the weekend"'
      },
      longcare: {
        id: 'longcare',
        name: 'Long-term Care',
        thumbnail: '../assets/images/dogs-playing.jpg',
        details: '"We\'re going to Europe..."'
      }
    };


    return {
      userMode: userMode,
      activities: activities
    }
  });
