'use strict';

describe('Service: recipefinder', function () {

  // load the service's module
  beforeEach(module('groceriesappApp'));

  // instantiate service
  var recipefinder;
  beforeEach(inject(function (_recipefinder_) {
    recipefinder = _recipefinder_;
  }));

  it('should do something', function () {
    expect(!!recipefinder).toBe(true);
  });

});
