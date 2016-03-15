'use strict';

describe('Service: dogdata', function () {

  // load the service's module
  beforeEach(module('barKnBApp'));

  // instantiate service
  var dogdata;
  beforeEach(inject(function (_dogdata_) {
    dogdata = _dogdata_;
  }));

  it('should do something', function () {
    expect(!!dogdata).toBe(true);
  });

});
