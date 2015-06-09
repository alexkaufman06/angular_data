myApp.controller('RegistrationController', function($scope, $location) {
  $scope.login = function() {
    $location.path('/meetings');
  } //login

  $scope.register = function() {
    $location.path('/meetings');
  }

  // $scope.$on('$viewContentLoaded', function() {
  //   console.log($scope.myform);
  // });  Practice with $scope
}); //RegistrationController
