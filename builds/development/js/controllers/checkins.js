myApp.controller('CheckInsController',
  function($scope, $rootScope, $firebase, $routeParams,
           $location, Authentication, CountMeetings, FIREBASE_URL) {

  $scope.whichmeeting = $routeParams.mId;
  $scope.whichuser = $routeParams.uId;
  $scope.order="firstname";
  $scope.direction=null;
  $scope.recordId="";
  $scope.query="";

  var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser +
                         '/meetings/' + $scope.whichmeeting + '/checkins');

  var checkInsList = $firebase(ref).$asArray();
  $scope.checkins = checkInsList;

  $scope.addCheckin = function() {
    var checkinsObj = $firebase(ref);
    var myData = {
      firstname: $scope.user.firstname,
      lastname : $scope.user.lastname,
      email    : $scope.user.email,
      date     : Firebase.ServerValue.TIMESTAMP
    };
    checkinsObj.$push(myData).then(function() {
      $location.path('/checkins/' + $scope.whichuser + '/' +
                     $scope.whichmeeting + '/checkinsList');
    }); //checkinsObj
  }; //addCheckin

  $scope.deleteCheckin = function(id) {
    var record = $firebase(ref);
    record.$remove(id);
  }; //deleteCheckin

  $scope.pickRandom = function() {
    var random = Math.round(Math.random() * (checkInsList.length - 1));
    $scope.recordId = checkInsList.$keyAt(random);
  };

  $scope.showLove = function(myItem) {
    myItem.show = !myItem.show;

    if(myItem.userState == 'expanded') {
      myItem.userState = '';
    } else {
      myItem.userState = 'expanded';
    }
  };

  $scope.giveLove = function(myItem, myGift) {
    var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser +
                               '/meetings/' + $scope.whichmeeting + '/checkins/' +
                               myItem.$id + '/awards');
    var checkinsObj = $firebase(refLove);
    var myData = {
      name: myGift,
      date: Firebase.ServerValue.TIMESTAMP
    };
    checkinsObj.$push(myData);
  };

  $scope.deleteLove = function(checkinId, award) {
    var refLove = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser +
                               '/meetings/' + $scope.whichmeeting + '/checkins/' +
                               checkinId + '/awards');
    var record = $firebase(refLove);
    record.$remove(award);
  };
}); //CheckInsController
