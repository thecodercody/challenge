angular.module('employeeDatabase').controller('DetailsCtrl', ['$scope', 'appFact', function($scope, appFact) {
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

  // setting all the details
  var setAttr = function() {
    if(appFact.employeeList){
      $scope.fName = appFact.employeeList.fName;
      $scope.lName = appFact.employeeList.lName;
      $scope.tel = appFact.employeeList.tel;
      $scope.email = appFact.employeeList.email;
      $scope.$apply();  // begin the "digestion" of new data
    }
  };
  setInterval(setAttr, 200); // setting continuous checking
}]);