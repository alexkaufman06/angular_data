myApp.factory('Authentication', function($firebase,
  $firebaseAuth, $rootScope, $routeParams, $location, FIREBASE_URL) {

  var data = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(data);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
      var user = $firebase(ref).$asObject();
      $rootScope.currentUser = user;
    } else {
      $rootScope.currentUser = '';
    }
  });

  var myObject = {
    login: function(user) {
      return auth.$authWithPassword({
        email: user.email,
        password: user.password
      });
    },
    register: function(user) {
      return auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        var ref = new Firebase(FIREBASE_URL+'users');
        var firebaseUsers = $firebase(ref);
        var userInfo = {
          date     : Firebase.ServerValue.TIMESTAMP,
          regUser  : regUser.uid,
          firstname: user.firstname,
          lastname : user.lastname,
          email    : user.email
        }; //user info
        firebaseUsers.$set(regUser.uid, userInfo);
      }); //promise
    } //register
  };
  return myObject;
});
