'use strict';

/**
 * @ngdoc service
 * @name groceriesappApp.recipefinder
 * @description
 * # recipefinder
 * Service in the groceriesappApp.
 */
angular.module('groceriesappApp')
  .service('recipefinder', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getRecipies = function() {
    	return $.get('recipies.json');
    };

    this.getRecipe = function(id) {
    	var recipeFile = id + '.json';
    	return $.get(recipeFile);
    };

    this.getPlannerRecipes = function() {
        return $.get('planner-recipies.json');
    };
  });
