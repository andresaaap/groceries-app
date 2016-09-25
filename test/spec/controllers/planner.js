'use strict';

describe('Controller: PlannerCtrl', function () {

  // load the controller's module
  beforeEach(module('groceriesappApp'));

  var PlannerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PlannerCtrl = $controller('PlannerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PlannerCtrl.awesomeThings.length).toBe(3);
  });
});
