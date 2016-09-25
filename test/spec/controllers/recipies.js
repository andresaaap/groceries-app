'use strict';

describe('Controller: RecipiesCtrl', function () {

  // load the controller's module
  beforeEach(module('groceriesappApp'));

  var RecipiesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RecipiesCtrl = $controller('RecipiesCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(RecipiesCtrl.awesomeThings.length).toBe(3);
  });
});
