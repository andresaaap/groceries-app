'use strict';

/**
 * @ngdoc overview
 * @name groceriesappApp
 * @description
 * # groceriesappApp
 *
 * Main module of the application.
 */
angular
  .module('groceriesappApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  	$urlRouterProvider.otherwise('/');

  	$stateProvider
  		.state('home', {
  			url: '/',
  			templateUrl: 'views/planner.html',
  			controller: 'PlannerCtrl as planner'
  		})
      .state('recipe', {
        url: '/recipe/:id',
        templateUrl: 'views/recipe.html',
        controller: 'RecipeCtrl as recipe'
      })
      .state('recipies', {
        url: '/recipies',
        templateUrl: 'views/recipies.html',
        controller: 'RecipiesCtrl as recipies'
      });

  }]);
