define(["app"],function (app){

	/*
		要加载的模板
	*/

	var rootUrl = "./modules/routeTpl/";

	var routeTpl = {
		tab: rootUrl+"tab/tab.html",
		dralog:rootUrl+"dralog/dralog.html",
		select:rootUrl+"select/select.html",
	}


	app.config(["$routeProvider",function ($routeProvider) {
		$routeProvider.
			when("/routeTpl/tab",{
				templateUrl:routeTpl.tab,
				controller:"tabCtrl"
			}).
			when("/routeTpl/dralog",{
				templateUrl:routeTpl.dralog
			}).
			when("/routeTpl/select",{
				templateUrl:routeTpl.select
			});
	}])
});