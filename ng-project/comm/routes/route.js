define(["app"],function (app){

	/*
		要加载的模板
	*/

	var rootUrl = "./modules/routeTpl/";

	var routeTpl = {
		order:  rootUrl+"order/order.html",
		tab: rootUrl+"tab/tab.html",
		dralog:rootUrl+"dralog/dralog.html",
		select:rootUrl+"select/select.html",
		todoList:rootUrl+"todoList/todoList.html"
	}


	app.config(["$routeProvider",function ($routeProvider) {
		$routeProvider.
			when("/",{
				template:"欢迎查看！"
			}).
			when('/example/order/:name', {
				templateUrl: function (urlattr){
					return "./modules/routeTpl/order/orderTpl/"+urlattr.name+".html"	
				},
				controller: 'orderCtrl'
			}).
			when("/example/tab",{
				templateUrl:routeTpl.tab,
				controller:"tabCtrl"
			}).
			when("/example/dralog",{
				templateUrl:routeTpl.dralog
			}).
			when("/example/select",{
				templateUrl:routeTpl.select
			}).
			when("/example/todoList",{
				templateUrl:routeTpl.todoList,
				controller:"todoLostCtrl"
			});
	}])
});