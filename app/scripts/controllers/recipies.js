'use strict';

/**
 * @ngdoc function
 * @name groceriesappApp.controller:RecipiesCtrl
 * @description
 * # RecipiesCtrl
 * Controller of the groceriesappApp
 */
angular.module('groceriesappApp')
  .controller('RecipiesCtrl', ['$interval', 'recipefinder', '$scope', function ($interval, reci, $scope) {
    var vm = this;
    this.recipies = [];
    this.recipiesId = '';

    //Get recipes info and update them

    reci.getRecipies().then(function(data) {
    	vm.recipies = data.array;
      vm.recipiesId = data.id;
    });

    var reqRecies;
    var timeCycle = 0;

    reqRecies = $interval(function() {
      var newRecipiesId = '';

      if (timeCycle>0) {
        reci.getRecipies().then(function(data) {
          newRecipiesId = data.id;
          if (newRecipiesId !== vm.recipiesId) {
            vm.recipies = data.array;
            vm.recipiesId = data.id;
          }
        });

      }
      else {
        reci.getRecipies().then(function(data) {
          vm.recipies = data.array;
          vm.recipiesId = data.id;
        });
      }
      timeCycle++;
    }, 500);

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      if (angular.isDefined(reqRecies)) {
        $interval.cancel(reqRecies);
        reqRecies = undefined;
      }
    });

  }]);
