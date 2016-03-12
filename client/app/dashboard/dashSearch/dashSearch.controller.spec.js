'use strict';

describe('Component: DashSearchComponent', function () {

  // load the controller's module
  beforeEach(module('barKnBApp'));

  var DashSearchComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DashSearchComponent = $componentController('DashSearchComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
