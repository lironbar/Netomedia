angular.module('app')
.factory('GetUsersFactory', ['$http', function($http) {
  return {
    get: function(cb){
      $http.get('app/data/users.json').then(function(response) {
        cb(response);
      },
      function(response) {
        cb(false);
      }
    )
  }
}
}]);
