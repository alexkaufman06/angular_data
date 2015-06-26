myApp.controller('RegistrationController',
  function($scope, $firebaseAuth, $location) {

    var data = new Firebase('https://alexangulardata.firebaseio.com/');
    var auth = $firebaseAuth(data);

  $scope.login = function() {
    auth.$authWithPassword({
      email: $scope.user.email,
      password: $scope.user.password
    }).then(function(user) {
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
