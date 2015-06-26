myApp.controller('RegistrationController',
  function($scope, $firebaseAuth, $location, FIREBASE_URL, Authentication) {

    var data = new Firebase(FIREBASE_URL);
    var auth = $firebaseAuth(data);

  $scope.login = function() {
    Authentication.login($scope.user)
    .then(function(user) {
      $location.path('/meetings');
    }).catch(function(error) {
      $scope.message = error.message;
    });
  }; //login

  $scope.register = function() {
    $location.path('/meetings');
  }

  // $scope.$on('$viewContentLoaded', function() {
  //   console.log($scope.myform);
  // });  Practice with $scope
}); //RegistrationController
