angular.module('employeeDatabase', ['ngRoute'])

// making an app-wide persistent object to attach data to
.factory('appFact', function appFactory(){
  return {};
})

.controller('MainCtrl', ['$scope', function($scope){
  $scope.enterPassword = function(){
    var password = prompt('Enter Password:');
    
  };
 
}])


.controller('DatabaseCtrl', ['$scope', 'appFact', function($scope, appFact){
  $.ajax({
    url: "http://employeedatastorage.com/api/employees",
    type: "GET",
    contentType: 'application/json',
    success: function (data) {
      $scope.employeeList = data;
    },
    error: function(data) {
      console.log('Error: Message not retrieved.');
     }
    });

  $scope.employeeDetails = function(employee)  {
    var uri = employee._id;
    $.ajax({
      url: 'http://employeedatastorage.com/api/employees/' + uri,
      type: "GET",
      contentType: 'application/json',
      success: function (data) {
        appFact.employeeList = data;
      },
      error: function(data) {
        console.log('Error: Message not retrieved.');
      }
    });
  };

}])

  .config(function($routeProvider, $locationProvider){
    $routeProvider

      // landing page
      .when('/', {
        templateUrl : './views/home.html',
        controller : 'MainCtrl'
      })

      .when('/database', {
        templateUrl: './views/database.html',
        controller: 'DatabaseCtrl'
      })

      .when('/details', {
        templateUrl: './views/details.html',
        controller: 'DetailsCtrl'
      })

      // all others
      .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
  });