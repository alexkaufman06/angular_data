myApp.controller('MeetingsController',
  function($scope, $rootScope, $firebase, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL + '/users/' +
                         $rootScope.currentUser.$id + '/meetings');
  var meetingsInfo = $firebase(ref);
  var meetingsObj = meetingsInfo.$asObject();
  var meetingsArray = meetingsInfo.$asArray();

  meetingsObj.$loaded().then(function(data) {
    $scope.meetings = data;
  }); //make sure meetings data is loaded

  meetingsArray.$loaded(function(data) {
    $rootScope.howManyMeetings = meetingsArray.length;
  });

  meetingsArray.$watch(function(data) {
    $rootScope.howManyMeetings = meetingsArray.length;
  });

  $scope.addMeeting = function() {
    meetingsInfo.$push({
      name: $scope.meetingname,
      date: Firebase.ServerValue.TIMESTAMP
    }).then(function() {
      $scope.meetingname='';
    });
  };

  $scope.deleteMeeting = function(key) {
    meetingsInfo.$remove(key);
  };
});
