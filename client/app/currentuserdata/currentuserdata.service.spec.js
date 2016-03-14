'use strict';

describe('Service: currentuserdata', function () {

  // load the service's module
  beforeEach(module('barKnBApp'));

  // instantiate service
  var currentuserdata;
  beforeEach(inject(function (_currentuserdata_) {
    currentuserdata = _currentuserdata_;
  }));

  it('should do something', function () {
    expect(!!currentuserdata).toBe(true);
  });

});
