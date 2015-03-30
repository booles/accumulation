
var myApp = angular.module("myApp",["ngRoute"],function ($routeProvider){
		$routeProvider
		.when("/",{
			templateUrl:"views/ng-index.html",
			controller:"blogCtrl"
		})
		.when("/blogs/ng",{
			templateUrl:"blogs/ng/list.html",
			controller:"blogList"
		})
		.when("/blogs/ng/:id",{
			templateUrl:"blogs/ng/ng_artcile.html",
			controller:"ngArticle"
		})
		.when("/blogs/backbone",{
			templateUrl:"blogs/ng/list.html",
			controller:"blogList"
		})
		.when("/blogs/backbone/:id",{
			templateUrl:"blogs/ng/ng_artcile.html",
			controller:"BbArticle"
		})
});
