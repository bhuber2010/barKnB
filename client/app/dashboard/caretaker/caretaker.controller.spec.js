'use strict';

describe('Component: CaretakerComponent', function () {

  // load the controller's module
  beforeEach(module('barKnBApp'));

  var CaretakerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CaretakerComponent = $componentController('CaretakerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
