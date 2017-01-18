angular.module('app')
.service('NewUserService', ['$http', '$rootScope', function($http, $rootScope) {
	var self = this;
	var newUser

	self.getNewUser = function(userData) {
		newUser = userData;
		$rootScope.$broadcast('addUserEvent', {
			sendData: newUser
		});
	}
}]);
