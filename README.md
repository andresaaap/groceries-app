# Groceries Planner App

This is a web app that helps you to plan the groceries you need to buy in a group of days based on the recipies that your are going to eat on those days. This will help you to be more organized and to buy the food that you really need. When you are done planning your groceries the app generates a "groceries list" that you can take to the supermarket to guide you.

## How to use it?

You have to add meals to the planner. To do so you have to click the plus button next to the day you want to add it. You can add other days that you want to include in your planner. When you added all the meals of the period you want to plan, click the button "Show Groceries List".

The app only shows the recipes for each country. In the planner-recipies.json file each recipe has a country defined. It takes up to 4 seconds for the app to only show the right recipes in the planner

## Getting Started

### Requirements

Be sure to have npm and bower installed in your computer

### Build & development

1. Download the node modules in the package.json by running `npm install`.
2. Download the bower components in bower.json by running `bower install`.
3. To server the project in the localhost run `grunt serve`.
4. To build the project run `grunt --force`.

### Testing

Running `grunt test` will run the unit tests with karma.

