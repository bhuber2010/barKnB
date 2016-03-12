'use strict';

describe('Service: dashdata', function () {

  // load the service's module
  beforeEach(module('barKnBApp.dashdata'));

  // instantiate service
  var dashdata;
  beforeEach(inject(function (_dashdata_) {
    dashdata = _dashdata_;
  }));

  it('should do something', function () {
    expect(!!dashdata).toBe(true);
  });

});
