angular.
	module('app').
		config(['$locationProvider', '$routeProvider',
			function config($locationProvider, $routeProvider) {
				$locationProvider.hashPrefix('!');

				$routeProvider.
				when ('/users', {
					template: '<page-list></page-list>'
				}).
				otherwise({redirectTo: '/users'});
			}
		]);
