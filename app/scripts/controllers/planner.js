'use strict';

/**
 * @ngdoc function
 * @name groceriesappApp.controller:PlannerCtrl
 * @description
 * # PlannerCtrl
 * Controller of the groceriesappApp
 */
angular.module('groceriesappApp')
  .controller('PlannerCtrl', ['$interval', 'recipefinder','$scope' ,'$timeout', function ($interval, reci, $scope, $timeout) {
    var vm = this;

    var vm = this;
    var countryUpdate = false;

    

    this.currentCity = '';

    this.locationLat = '';

    this.locationLon = '';

    this.country = '';

    this.days = [];

    this.recipies = [];

    this.recipiesId = '';

    this.breakfasts = [];

    this.lunchs = [];

    this.dinners = [];

    this.currentDay = '';

    var MEAT_FISH_CHICKEN_CAT = 'meat, fish and chicken';

    var FRUITS_VEGETABLES_CAT = 'fruits and vegetables';

    var MILK_PRODUCTS_CAT = 'milk products';

    var OTHER_FOOD_CAT = 'other food';

    //Groceries list

    this.meatFishChicken = [];

    this.fruitsVegetables = [];

    this.milkProducts = [];

    this.otherFood = [];

    //Load app info

    var reqPlan;
    var timeCycle = 0;

    reqPlan = $interval(function() {

        var recipiesCopy = [];
        var newRecipeName = '';
        var newRecipeCountry = '';
        var newRecipeCountryUpdated = false;
        var newRecipeServings = '';
        var newRecipeIngredients = [];
        var newIngredientName = '';
        var newIngredientMass = '';
        var newIngredientCategory = '';

        
          var newRecipiesId = '';

          if (timeCycle>0) {

            reci.getPlannerRecipes().then(function(data) {
              newRecipiesId = data.id;

              if (vm.country !== '') {
                console.log('pais reconocido');

                if ((newRecipiesId !== vm.recipiesId)||(!countryUpdate)) {
                  vm.recipiesId = data.id;
                  recipiesCopy = data.array;
                  vm.recipies = [];

                  countryUpdate = true;


                    for (var i = 0; i < recipiesCopy.length; i++) {
                        
                        newRecipeCountry = recipiesCopy[i].country;
                        newRecipeName = recipiesCopy[i].name;
                        newRecipeServings = recipiesCopy[i].servings;
                        
                        if (newRecipeCountry === vm.country) {
                          for (var j = 0; j < recipiesCopy[i].ingredients.length; j++) {
                              newIngredientName = recipiesCopy[i].ingredients[j].name;
                              newIngredientMass = recipiesCopy[i].ingredients[j].mass;
                              newIngredientCategory = recipiesCopy[i].ingredients[j].category;

                              newRecipeIngredients.push(new Ingredient(newIngredientName,newIngredientMass,newIngredientMass,newIngredientCategory));
                          }
                          vm.recipies.push(new Recipe(newRecipeName,newRecipeServings,newRecipeIngredients,newRecipeCountry));
                          newRecipeIngredients = [];
                        }
                        
                    }
                }
              }
              else {
                if (newRecipiesId !== vm.recipiesId) {
                  vm.recipiesId = data.id;
                  recipiesCopy = data.array;
                  vm.recipies = [];

                  


                    for (var i = 0; i < recipiesCopy.length; i++) {
                        
                        newRecipeCountry = recipiesCopy[i].country;
                        newRecipeName = recipiesCopy[i].name;
                        newRecipeServings = recipiesCopy[i].servings;
                        
                        
                          for (var j = 0; j < recipiesCopy[i].ingredients.length; j++) {
                              newIngredientName = recipiesCopy[i].ingredients[j].name;
                              newIngredientMass = recipiesCopy[i].ingredients[j].mass;
                              newIngredientCategory = recipiesCopy[i].ingredients[j].category;

                              newRecipeIngredients.push(new Ingredient(newIngredientName,newIngredientMass,newIngredientMass,newIngredientCategory));
                          }
                          vm.recipies.push(new Recipe(newRecipeName,newRecipeServings,newRecipeIngredients,newRecipeCountry));
                          newRecipeIngredients = [];
                        
                    }
                }
              }
                          


            });
          }
          else {

            reci.getPlannerRecipes().then(function(data) {
              vm.recipiesId = data.id;
              recipiesCopy = data.array;

              for (var i = 0; i < recipiesCopy.length; i++) {
                  newRecipeName = recipiesCopy[i].name;
                  newRecipeServings = recipiesCopy[i].servings;
                  newRecipeCountry = recipiesCopy[i].country;
                  
                    for (var j = 0; j < recipiesCopy[i].ingredients.length; j++) {
                        newIngredientName = recipiesCopy[i].ingredients[j].name;
                        newIngredientMass = recipiesCopy[i].ingredients[j].mass;
                        newIngredientCategory = recipiesCopy[i].ingredients[j].category;

                        newRecipeIngredients.push(new Ingredient(newIngredientName,newIngredientMass,newIngredientMass,newIngredientCategory));
                    }
                    vm.recipies.push(new Recipe(newRecipeName,newRecipeServings,newRecipeIngredients,newRecipeCountry));
                    newRecipeIngredients = [];
                  
                  
              }

              vm.recipiesId = data.id;
            });
            
          }
          timeCycle++;

        
      
    }, 1000);

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      if (angular.isDefined(reqPlan)) {
        $interval.cancel(reqPlan);
        reqPlan = undefined;
        console.log('Destroy planner-json');
      }
    });

    //Day class definition
    function Day (pName, pDate) {
        this.name = pName;
        this.id = pName+pDate;
        this.date = pDate;
        this.meals = [];
    }

    Day.prototype.addMeal = function(newMeal) {
        this.meals.push(newMeal);
    };

  //Meal class definition
    function Meal (pType, pRecipe) {
	    this.type = pType;
	    this.recipe = pRecipe;
	}

	//Recipe class definition
    function Recipe (pName, pServings, pIngredients) {
	    this.name = pName;
	    this.servings = pServings;
	    this.ingredients = pIngredients;
	}

	//Ingredient class definition
    function Ingredient (pName, pUnitMass, pMass, pCategory) {
	    this.name = pName;
	    this.unitMass = pUnitMass;
	    this.mass = pMass;
      this.category = pCategory;
	}

  //ListItem class definition
    function ListItem (pName, pUnitMass, pMass, pCategory) {
      this.name = pName;
      this.unitMass = pUnitMass;
      this.mass = pMass;
      this.category = pCategory;
    }

    ListItem.prototype.moreIngredient = function(pMass) {
      this.mass += pMass;
    };


    //Add initial days to the app

    var weekday = new Array(7);
    weekday[0]=  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    var date = new Date(new Date().getTime());
    var dayWeek = date.getDay();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 24 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 48 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 72 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 96 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 120 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    date = new Date(new Date().getTime()+ 144 * 60 * 60 * 1000);
    dayWeek = date.getDay();
    day = date.getDate();
    month = date.getMonth();
    year = date.getFullYear();
    day = new Day(weekday[dayWeek],day+'/'+month+'/'+year);
    this.days.push(day);

    //Open-close left slide menu

    this.opencloseSlideMenu = function() {
      var selector = $('.slide-menu-left');
      var selectorMenuButton = $('.hamburger-icon');
      var selectorSlideMenuLink = $('.nav-link-slide');
      selector.toggleClass('is-active');
      if (selectorMenuButton.attr('aria-pressed')==='false') {
        selectorMenuButton.attr('aria-pressed','true');
        selectorSlideMenuLink[0].focus();
      }
      else {
        selectorMenuButton.attr('aria-pressed','false');
      }

    };

    //Open-close modals

    //Trap tab key in meal modal 

    var currentFocusedElement = document.activeElement;  


    this.addMealListener = function() {
      var modalNewMeal = document.getElementById('modal-new-meal');
      if (modalNewMeal) {
       //Handle the focus of the modal 
       modalNewMeal.addEventListener('keydown',function(e) {
        var focusedElementModal = document.activeElement;
        var firstElementMealModal = document.getElementById('modal-meal-type-list');
        var lastElementMealModal = document.getElementById('close-new-meal-modal');
        //Handle the tab and focus the appropiate element
        if (e.keyCode === 9) {
          ////Handle the shift + tab and focus the appropiate element
          if (e.shiftKey) {
            if (focusedElementModal.id === firstElementMealModal.id) {
              e.preventDefault();
              lastElementMealModal.focus();
            }
          }
          else {
            if (focusedElementModal.id === lastElementMealModal.id) {
              e.preventDefault();
              firstElementMealModal.focus();
            }
          }
        }
        //Handle the esc, close modal and focus the appropiate element
        else if (e.keyCode === 27) {
          vm.closeMealModal();
          currentFocusedElement.focus();
        }
       });
      }
    };

    vm.addMealListener();

    //Trap tab key in day modal 

    this.addDayListener = function() {
      var modalNewDay = document.getElementById('modal-new-day');
      if (modalNewDay) {
       //Handle the focus of the modal 
       modalNewDay.addEventListener('keydown',function(e) {
        var focusedElementModal = document.activeElement;
        var firstElementModal = document.getElementById('datepicker');
        var secondElementModal = document.getElementById('but-add-new-day');
        var lastElementModal = document.getElementById('close-new-day-modal');
        //Handle the tab and focus the appropiate element
        if (e.keyCode === 9) {
          ////Handle the shift + tab and focus the appropiate element
          if (e.shiftKey) {
            if (focusedElementModal.id === firstElementModal.id) {
              e.preventDefault();
              lastElementModal.focus();
            }
          }
          else {
            if (focusedElementModal.id === lastElementModal.id) {
              e.preventDefault();
              firstElementModal.focus();
            }
            else if (focusedElementModal.id === firstElementModal.id) {
              e.preventDefault();
              secondElementModal.focus();
            }
          }
        }
        //Handle the esc, close modal and focus the appropiate element
        else if (e.keyCode === 27) {
          vm.closeDayModal();
          
        }
       });
      }
    };

    vm.addDayListener();

    //Trap key in groceries list modal
     //Trap tab key in day modal 

    this.addGroceriesListener = function() {
      var modalGroceries = document.getElementById('modal-groceries-list');
      if (modalGroceries) {
       //Handle the focus of the modal 
       modalGroceries.addEventListener('keydown',function(e) {
        var focusedElementModal = document.activeElement;
        var firstElementModal = document.getElementById('close-groceries-list-modal');
        //Handle the tab and focus the appropiate element
        if (e.keyCode === 9) {
          ////Handle the shift + tab and focus the appropiate element
          if (e.shiftKey) {
            
              e.preventDefault();
            
          }
          else {
            
              e.preventDefault();
          }
        }
        //Handle the esc, close modal and focus the appropiate element
        else if (e.keyCode === 27) {
          vm.closeGroceriesListModal();
          
        }
       });
      }
    };

    vm.addGroceriesListener();

    this.openMealModal = function(pday) {
       currentFocusedElement = document.activeElement;
       var selector = $('#modal-new-meal');
       var selectorInput = $('#modal-meal-type-list');
       var bodySelector = $('body');
       selector.toggleClass('active');
       bodySelector.toggleClass('active');
       vm.currentDay = pday;
       selectorInput.focus();
    };

    this.closeMealModal = function() {
       var selector = $('#modal-new-meal');
       selector.toggleClass('active');
       var bodySelector = $('body');
       bodySelector.toggleClass('active');
       currentFocusedElement.focus();
    };

    this.openDayModal = function() {
       currentFocusedElement = document.activeElement;
       var selector = $('#modal-new-day');
       var selectorDatepicker = $('#datepicker');
       var selectorMessage = $('#datepicker-error');

       selector.toggleClass('active');
       var bodySelector = $('body');
       bodySelector.toggleClass('active');
       selectorDatepicker.focus();

    };

    this.closeDayModal = function() {
       var selector = $('#modal-new-day');
       var selectorDatepicker = $('#datepicker');
       var selectorMessage = $('#datepicker-error');

       //If the modal is opened reset the input and the modal
        selector.val('');
        selectorMessage.css("display", "none");
        selectorMessage.val("");
        $('#datepicker').css("border-color", "#e5e5e5");
        selector.toggleClass('active');
        var bodySelector = $('body');
        bodySelector.toggleClass('active');
        currentFocusedElement.focus();
    };

    //Reset datepicker
    this.resetDatepicker = function() {
      var selectorDatepicker = $('#datepicker');
      var selectorMessage = $('#datepicker-error');
      selectorDatepicker.val('');
      selectorMessage.css("display", "none");
      selectorMessage.val("");
      selectorDatepicker.css("border-color", "#e5e5e5");
    };

    this.openGroceriesListModal = function() {
       currentFocusedElement = document.activeElement;
       var selector = $('#modal-groceries-list');
       var selectorClose = $('#close-groceries-list-modal');
       selector.toggleClass('active');
       var bodySelector = $('body');
       bodySelector.toggleClass('active');
       selectorClose.focus();
    };

    this.closeGroceriesListModal = function() {
       var selector = $('#modal-groceries-list');
       selector.toggleClass('active');
       var bodySelector = $('body');
       bodySelector.toggleClass('active');
       currentFocusedElement.focus();
    };

    //Add a new day to the meals planner
    this.addDay = function() {
        var selectedDay = $( "#modal-day-list option:selected" ).text();
        //Get date info from datepicker
        var date = vm.datePickerGetDate();
        console.log('is empty');
        console.log(date);
        console.log(date!=='null');
        if (date!=='null') {
          var dateNow = new Date(new Date().getTime());
          var dateArray = date.split(" ");
          var dateDay = dateArray[0];
          var dateMonth = '';
          console.log(dateNow.getDate());

          //Format the Month
          if (dateArray[1]==='Jan') {
            dateMonth = "01";
          }
          else {
            if (dateArray[1]==='Feb') {
              dateMonth = "02";
            }
            else {
              if (dateArray[1]==='Mar') {
                dateMonth = "03";
              }
              else {
                if (dateArray[1]==='Apr') {
                  dateMonth = "04";
                }
                else {
                  if (dateArray[1]==='May') {
                    dateMonth = "05";
                  }
                  else {
                    if (dateArray[1]==='Jun') {
                      dateMonth = "06";
                    }
                    else {
                      if (dateArray[1]==='Jul') {
                        dateMonth = "07";
                      }
                      else {
                        if (dateArray[1]==='Aug') {
                          dateMonth = "08";
                        }
                        else {
                          if (dateArray[1]==='Sep') {
                            dateMonth = "09";
                          }
                          else {
                            if (dateArray[1]==='Oct') {
                              dateMonth = "10";
                            }
                            else {
                              if (dateArray[1]==='Nov') {
                                dateMonth = "11";
                              }
                              else {
                                dateMonth = "12";
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }


          //Format the day
          if (dateDay==='Mon') {
            dateDay = "Monday";
          }
          else {
            if (dateDay==='Tue') {
              dateDay = "Tuesday";
            }
            else {
              if (dateDay==='Wed') {
                dateDay = "Wednesday";
              }
              else {
                if (dateDay==='Thu') {
                  dateDay = "Thursday";
                }
                else {
                  if (dateDay==='Fri') {
                    dateDay = "Friday";
                  }
                  else {
                    if (dateDay==='Sat') {
                      dateDay = "Saturday";
                    }
                    else {
                      dateDay = "Sunday";
                    }
                  }
                }
              }
            }
          }
          
          

          if (vm.validateDate(parseInt(dateArray[2]),dateMonth,parseInt(dateArray[3]),dateNow)) {
            var dateDate = dateArray[2]+'/'+dateMonth+'/'+dateArray[3];
            //Create new day
            var newDay = new Day(dateDay, dateDate);
            //Add meal to the new day and add the day to the array
            this.days.push(newDay);
            vm.resetDatepicker();
          }

        }
        else {
          vm.dateIsEmpty();
        }
        

    };

    this.validateDate = function(pDay,pMonth,pYear,pDateNow) {
      console.log('validate');
      var isValid = true;
      if (pYear>=pDateNow.getFullYear()) {
          if (pMonth>=pDateNow.getMonth()) {
            if (pDay>=pDateNow.getDate()) {

            }
            else {
              isValid = false;
              vm.dateIsInvalid();
            }
          }
          else {
            isValid = false;
            vm.dateIsInvalid();
          }
      }
      else {
        isValid = false;
        vm.dateIsInvalid();
      }

      return isValid;
    };

    this.dateIsInvalid = function() {
      var selector = $('#datepicker');
      var selectorMessage = $('#datepicker-error');

      selector.css("border-color", "#FF0000");
      selector.css("border-style", "double");
      selectorMessage.css("display", "initial");
      selectorMessage.text("Please choose a date that is the current date or any date after");
    };

    this.dateIsEmpty = function() {
      var selector = $('#datepicker');
      var selectorMessage = $('#datepicker-error');

      selector.css("border-color", "#FF0000");
      selector.css("border-style", "double");
      selectorMessage.css("display", "initial");
      selectorMessage.text("Please choose a date");
    };

    //Add a new meal to a day
    this.addMeal = function() {
        //Get the selected option of meal type
        var mealType = $( "#modal-meal-type-list option:selected" ).text();
        //Get the selected option of recipe
        var mealRecipeName = $( "#modal-recipe-list option:selected" ).text();
        var mealRecipe = {};
        var stop = false;
        //Look for the info of the recipe
        for (var i = 0; (i < vm.recipies.length)&&(!stop); i++) {
            if (vm.recipies[i].name === mealRecipeName) {
                mealRecipe = vm.recipies[i];
                stop = true;
            }
        }
        //Add the new meal
        vm.currentDay.addMeal(new Meal(mealType, mealRecipe));
    };

    //Date picker widget
    this.createDatePicker = function() {
      $( "#datepicker" ).datepicker();
    };

    this.datePickerGetDate = function() {
      return String($("#datepicker").datepicker("getDate"));
    };

      //Initialize datepicker
      vm.createDatePicker();

    //Clean the groceries list
    this.cleanGroceriesList = function() {
      for (var i = 0; i < vm.meatFishChicken.length; i++) {
        vm.meatFishChicken[i].mass = 0;
      }
      for (var i = 0; i < vm.fruitsVegetables.length; i++) {
        vm.fruitsVegetables[i].mass = 0;
      }
      for (var i = 0; i < vm.milkProducts.length; i++) {
        vm.milkProducts[i].mass = 0;
      }
      for (var i = 0; i < vm.otherFood.length; i++) {
        vm.otherFood[i].mass = 0;
      }
    };

    //Create the groceries list
    this.createGroceriesList = function() {
        var currentMeals = {};
        var currentMealsLength = 0;
        var currentMealIngredients = [];
        var currentMealIngredientsLength = 0;
        var currentIngredients = 0;
        vm.cleanGroceriesList();
        for (var i = 0; i < vm.days.length; i++) {
          currentMeals = vm.days[i].meals;
          currentMealsLength = currentMeals.length;
          for (var j = 0; j < currentMealsLength; j++) {
            currentIngredients = currentMeals[j].recipe.ingredients;
            for (var k = 0; k < currentIngredients.length; k++) {
              var ingredientCategory = currentIngredients[k].category;
              var ingredientName = currentIngredients[k].name;
              var ingredientUnitMass = currentIngredients[k].unitMass;
              var ingredientMass = currentIngredients[k].mass;
              var listItem = {};
              listItem = vm.listItemExists(ingredientName,ingredientCategory);
              if (ingredientCategory === MEAT_FISH_CHICKEN_CAT) {
                if (listItem) {
                  console.log('inside meat add more');
                  listItem.moreIngredient(ingredientMass);

                }
                else {
                  console.log('inside meat create');
                  vm.meatFishChicken.push(new ListItem(ingredientName,ingredientUnitMass,ingredientMass,ingredientCategory));
                }
              }
              else{
                if (ingredientCategory === FRUITS_VEGETABLES_CAT) {
                  if (listItem) {
                    console.log('inside fruit add more');
                    listItem.moreIngredient(ingredientMass);
                  }
                  else {
                    console.log('inside fruit create');
                    vm.fruitsVegetables.push(new ListItem(ingredientName,ingredientUnitMass,ingredientMass,ingredientCategory));
                  }
                }
                else {
                  if (ingredientCategory === MILK_PRODUCTS_CAT) {
                    if (listItem) {
                      console.log('inside milk add more');
                      listItem.moreIngredient(ingredientMass);
                    }
                    else {
                      console.log('inside milk create');
                      vm.milkProducts.push(new ListItem(ingredientName,ingredientUnitMass,ingredientMass,ingredientCategory));
                    }
                  }
                  else {
                    if (listItem) {
                      console.log('inside other food add more');
                      listItem.moreIngredient(ingredientMass);
                    }
                    else {
                      console.log('inside other food create');
                      vm.otherFood.push(new ListItem(ingredientName,ingredientUnitMass,ingredientMass,ingredientCategory));
                    }
                  }
                }
              }
            }

          }

        }
        vm.openGroceriesListModal();
        console.log(vm.meatFishChicken);
        console.log(vm.otherFood);
    };

    //Checks if ListItem exists
    this.listItemExists = function(pName,pCategory) {
      var itemExists = false;
      var itemChecked = {};
      var item = null;

      if (MEAT_FISH_CHICKEN_CAT===pCategory) {
        for (var i = 0; (i < vm.meatFishChicken.length) && (!itemExists); i++) {
          itemChecked = vm.meatFishChicken[i];
          if (itemChecked.name === pName) {
            itemExists = true;
            item = itemChecked;
          }
        }
      }
      else {
        if (FRUITS_VEGETABLES_CAT===pCategory) {
          for (var i = 0; (i < vm.fruitsVegetables.length) && (!itemExists); i++) {
            itemChecked = vm.fruitsVegetables[i];
            if (itemChecked.name === pName) {
              itemExists = true;
              item = itemChecked;
            }
          }
        }
        else {
          if (MILK_PRODUCTS_CAT===pCategory) {
            for (var i = 0; (i < vm.milkProducts.length) && (!itemExists); i++) {
              itemChecked = vm.milkProducts[i];
              if (itemChecked.name === pName) {
                itemExists = true;
                item = itemChecked;
              }
            }
          }
          else {
            for (var i = 0; (i < vm.otherFood.length) && (!itemExists); i++) {
              itemChecked = vm.otherFood[i];
              if (itemChecked.name === pName) {
                itemExists = true;
                item = itemChecked;
              }
            }
          }

        }
      }

      return item;
    };

     // check for Geolocation support
    if (navigator.geolocation) {
      $scope.$on('$viewContentLoaded', function () {
      console.log('sssdsd');
        var startPos;
        var geoOptions = {
           timeout: 10 * 1000
        };
        var geoSuccess = function(position) {
          startPos = position;
          console.log('sssdsd');

          vm.locationLat = startPos.coords.latitude;
          vm.locationLon = startPos.coords.longitude;
          
        };

        var geoError = function(error) {
          console.log('Error occurred. Error code: ' + error.code);
          // error.code can be:
          //   0: unknown error
          //   1: permission denied
          //   2: position unavailable (error response from location provider)
          //   3: timed out
        };
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
    });
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }

    $timeout(function() {
      console.log(vm.locationLat.toString());
       $.get('http://maps.googleapis.com/maps/api/geocode/json?latlng='+vm.locationLat.toString()+','+vm.locationLon.toString()+'&sensor=false').then(function(data) {
          
          vm.country = data.results[7].address_components[0].long_name;
          console.log(data);
       });
    },4000);

  }]);
