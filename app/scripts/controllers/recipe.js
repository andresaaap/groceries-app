'use strict';

/**
 * @ngdoc function
 * @name groceriesappApp.controller:RecipeCtrl
 * @description
 * # RecipeCtrl
 * Controller of the groceriesappApp
 */
angular.module('groceriesappApp')
  .controller('RecipeCtrl', ['$interval','$stateParams', 'recipefinder', '$scope', function ($interval, $stateParams, reci, $scope) {
    
  	var vm = this;
    this.recipe = '';
    this.recipeId = '';

    reci.getRecipe($stateParams.id).then(function(data) {
      vm.recipe = data;
    });

    var reqReci;
    var timeCycle = 0;

    reqReci = $interval(function() {
      var newRecipeId = '';

      if (timeCycle>0) {

        reci.getRecipe($stateParams.id).then(function(data) {
          newRecipeId = data.fileId;
          if (newRecipeId !== recipeId) {
            vm.recipe = data;
            vm.recipeId = data.fileId;
          }
        });

      }
      else {
        reci.getRecipe($stateParams.id).then(function(data) {
          vm.recipe = data;
          vm.recipeId = data.fileId;
        });
      }
      console.log(vm.recipe);
      timeCycle++;
    }, 500);

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      if (angular.isDefined(reqReci)) {
        $interval.cancel(reqReci);
        reqReci = undefined;
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('destroy recipe');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
        console.log('--------');
      }
    });

  }]);
