myApp.controller('MeetingsController', function($scope, $firebase) {
  var ref = new Firebase('https://alexangulardata.firebaseio.com/meetings');

  var meetings = $firebase(ref);

  $scope.meetings = meetings.$asObject();
});
