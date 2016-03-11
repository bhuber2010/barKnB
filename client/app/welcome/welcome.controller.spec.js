'use strict';

describe('Component: WelcomeComponent', function () {

  // load the controller's module
  beforeEach(module('barKnBApp'));

  var WelcomeComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    WelcomeComponent = $componentController('WelcomeComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
