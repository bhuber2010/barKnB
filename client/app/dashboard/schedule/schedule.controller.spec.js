'use strict';

describe('Component: ScheduleComponent', function () {

  // load the controller's module
  beforeEach(module('barKnBApp'));

  var ScheduleComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ScheduleComponent = $componentController('ScheduleComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
