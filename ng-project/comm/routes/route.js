define(["app"],function (app){

	/*
		要加载的模板
	*/

	var rootUrl = "./modules/routeTpl/"

	var routeTpl = {
		tab: rootUrl+"tab/tab.html",
		dralog:rootUrl+"dralog/dralog.html"
	}


	app.config(["$routeProvider",function ($routeProvider) {
		$routeProvider.
			when("/routeTpl/tab",{
				templateUrl:routeTpl.tab
			}).
			when("/routeTpl/dralog",{
				templateUrl:routeTpl.dralog
			});
	}])
});