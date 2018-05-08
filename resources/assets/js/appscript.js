// script.js

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var app = angular.module('MallyApp', ['ngRoute', 'ui.bootstrap']);

app.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);

app.config(function($logProvider){
    $logProvider.debugEnabled(true);
});

// configure our routes
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/home', {
            controller: 'homeController',
            templateUrl: BASEURL + '/resources/views/front/Home.html',
        })
        .when('/products/', {
            controller: 'productController',
            templateUrl: BASEURL + '/resources/views/front/Products.html',
        })
        .when('/users/', {
            controller: 'usersController',
            templateUrl: BASEURL + '/resources/views/front/Users.html',
        })
        .otherwise({
            templateUrl: BASEURL + '/resources/views/front/404.html',
        });
        $locationProvider.html5Mode(true);
    });

// Home controller
app.controller('homeController', function($scope) {
  console.log('home');
});

app.controller('productController', function($scope) {
  console.log('productController');
});

app.controller('usersController', function($scope) {
  console.log('usersController');
});

// Custom code.
app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
});
// Main controller
app.controller('mainController', function($scope) {
   // create a message to display in our view
   $('.selectpicker').selectpicker();
});
