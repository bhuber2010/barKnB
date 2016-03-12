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
        details: 'Quick description'
      },
      shortcare: {
        id: 'shortcare',
        name: 'Short-term Care',
        thumbnail: '../assets/images/dog-sitting.jpg',
        details: 'Quick description'
      },
      longcare: {
        id: 'longcare',
        name: 'Long-term Care',
        thumbnail: '../assets/images/dogs-playing.jpg',
        details: 'Quick description'
      }
    };


    return {
      userMode: userMode,
      activities: activities
    }
  });
