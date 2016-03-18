'use strict';

describe('Service: timekit_old', function () {

  // load the service's module
  beforeEach(module('barKnBApp'));

  // instantiate service
  var timekit;
  beforeEach(inject(function (_timekit_) {
    timekit = _timekit_;
  }));

  it('should do something', function () {
    expect(!!timekit).toBe(true);
  });

});
