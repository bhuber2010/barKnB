'use strict';

angular.module('barKnBApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('logout', {
        url: '/logout?referrer',
        referrer: 'welcome',
        template: '',
        controller: function($state, Auth) {
          var referrer = $state.params.referrer ||
                          $state.current.referrer ||
                          'welcome';
          Auth.logout();
          $state.go(referrer);
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupController',
        controllerAs: 'vm'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'profile',
        authenticate: true
      })
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('password', {
        url: '/settings/password',
        templateUrl: 'app/account/password/password.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        authenticate: true
      })
      .state('newdog', {
        url: '/newdog',
        templateUrl: 'app/account/newDog/newdog.html',
        controller: 'NewDogController',
        controllerAs: 'nd',
        authenticate: true
      })
      .state('editdog', {
        url: '/editdog',
        templateUrl: 'app/account/newDog/newdog.html',
        controller: 'EditDogController',
        controllerAs: 'nd',
        authenticate: true
      })
  })
  .run(function($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if (next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  });
