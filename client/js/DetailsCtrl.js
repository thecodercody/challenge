angular.module('employeeDatabase').controller('DetailsCtrl', ['$scope', 'appFact', function($scope, appFact) {
  var getter = function(){
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
  };

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

  getter();

  var id,
      fName,
      lName,
      tel,
      email;

  // setting all the details
  var setAttr = function() {
    if(appFact.employeeList){
      $scope.id = appFact.employeeList._id;
      $scope.fName = appFact.employeeList.fName;
      $scope.lName = appFact.employeeList.lName;
      $scope.tel = appFact.employeeList.tel;
      $scope.email = appFact.employeeList.email;
      $scope.$apply();  // begin the "digestion" of new data
    }
  };
  setInterval(setAttr, 200); // setting continuous checking

   $('#update').on('click', function(){
    //gather user input
    id = $('#_id').val();
    console.log(id);
    fName = $('#fName').val();
    lName = $('#lName').val();
    tel = $('#tel').val();
    email = $('#email').val();
    
    var $items = $('#fName, #lName,#tel,#email');
    var obj = {};
    $items.each(function() {
        obj[this.id] = $(this).val();
    })

    var json= JSON.stringify(obj);

    //change database based on user input
    $.ajax({
      url: "http://employeedatastorage.com/api/employees/" + id,
      data: json,
      type: "PUT",
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
              },
      error: function(data) {
        console.log('Error. Message not retrieved.');
      }
    })
    setAttr();
  });

  $('#delete').on('click', function(){
    id = $('#_id').val();
    
    var $items = $('#_id');
    var obj = {};
    $items.each(function() {
        obj[this.id] = $(this).val();
    })

    var json= JSON.stringify(obj);


    $.ajax({
      url: "http://employeedatastorage.com/api/employees/" + $('#_id').val(),
      data: json,
      type: "DELETE",
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log('Error. Message not retrieved.');
      }
    });
  });

  $('#create').on('click', function(){
    fName = $('#fName').val();
    lName = $('#lName').val();
    tel = $('#tel').val();
    email = $('#email').val();
    
    var $items = $('#fName, #lName,#tel,#email');
    var obj = {};
    $items.each(function() {
        obj[this.id] = $(this).val();
    })

    var json= JSON.stringify(obj);


    $.ajax({
      url: "http://employeedatastorage.com/api/employees/",
      data: json,
      type: "POST",
      contentType: 'application/json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log('Error. Message not retrieved.');
      }
    });
  });
}]);