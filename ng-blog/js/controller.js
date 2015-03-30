//博客主页的技术分类

myApp.controller("blogCtrl",["$scope",function (scope){
	scope.title = "aaa";	
	scope.lists = [
		{
			HtmlSrc:"#/blogs/ng",
			title:"angularjs",
			totle:10
		},
		{
			HtmlSrc:"#/blogs/backbone",
			title:"backbone",
			totle:10
		},
		{
			HtmlSrc:"#/blogs/ng",
			title:"html5+css3",
			totle:10
		},
		{
			HtmlSrc:"#/blogs/ng",
			title:"nodejs",
			totle:10
		},
	];

	scope.getHtmlSrc = function (index){
		return scope.htmlSrc(index);
	};


}]);

//angularjs博客列表
myApp.controller("blogList",["$scope","$location",function (scope,location){
	var path = location.path();

	switch(path){
		case "/blogs/ng":
			scope.title = "angularjs文章列表";
		break;
		case "/blogs/backbone":
			scope.title = "backbone文章列表";
		break;
	}


	
		scope.blogLists = [
			{
				list:"AngularJS开发指南01：AngularJS简介",
				id:1,
				times:"2014-3-31"
			},
			{
				list:"AngularJS入门教程02：AngularJS模板",
				id:2,
				times:"2014-3-31"
			},
			{
				list:"AngularJS入门教程03：迭代器",
				id:3,
				times:"2014-3-31"
			}
		];
}]);


//angularjs文章内容
myApp.controller("ngArticle",["$scope","$routeParams",function (scope,routeParams){

	var id = routeParams.id;

	var text = [

	"01:AngularJS 是一个为动态WEB应用设计的结构框架。它能让你使用HTML作为模板语言，通过扩展HTML的语法，",

	"02:让你能更清楚、简洁地构建你的应用组件。它的创新点在于，利用 数据绑定 和 依赖注入，它使你不用再写大量的代码了。",

	"03:这些全都是通过浏览器端的Javascript实现，这也使得它能够完美地和任何服务器端技术结合。"

	]

	var tilte = [
		"AngularJS开发指南01：AngularJS简介",
		"AngularJS入门教程02：AngularJS模板",
		"AngularJS入门教程03：迭代器"
	];	

	scope.title = tilte[id]

	var ngArticles = [

		{
			times:"2014-3-31",
			author:"王允1",
			sa:"http://www.angularjs.cn/A00n",
			text:text[id]
		},
		{
			times:"2014-3-31",
			author:"王允2",
			sa:"http://www.angularjs.cn/A00n",
			text:text[id]
		},
		{
			times:"2014-3-31",
			author:"王允3",
			sa:"http://www.angularjs.cn/A00n",
			text:text[id]
		}
	];

	scope.artcile = ngArticles[id-1];
		
}]);

