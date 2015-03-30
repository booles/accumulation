var myApp = angular.module("myApp",["ngRoute"],function ($routeProvider){
			$routeProvider.when("/",{
				templateUrl:"good.html",
				controller:"todoMVC"
			})

			.when("/:status",{
				templateUrl:"good.html",
				controller:"todoMVC"
			})
			.otherwise({
				redirectTo: '/'
			});
	});


