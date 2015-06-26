myApp.factory('Authentication', function($firebase,
  $firebaseAuth, $routeParams, $location, FIREBASE_URL) {

  var data = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(data);

  var myObject = {
    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    }
  };
  return myObject;
});
