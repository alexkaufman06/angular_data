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
  };

  $scope.register = function() {
    Authentication.register($scope.user)
      .then(function(user) {
        Authentication.login($scope.user);
        $location.path('/meetings');
      }).catch(function(error) {
        $scope.message = error.message;
      });
  };
});
