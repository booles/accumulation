define(["angular"],function (angular){
	var exampleApp = angular.module('exampleApp', []).
	controller('firstCtrl', ['$scope', function ($scope) {
		
	}]).
	controller('leftSlidCtrl', ['$scope', function ($scope) {
		$scope.left_title = [
        	{
        		name:"轮播",
        		routeUrl:"#/example/tab"
        	},
        	{
        		name:"弹框",
        		routeUrl:"#/example/dralog"
        	},
        	{
        		name:"下拉框",
        		routeUrl:"#/example/select"
        	},
        	{
        		name:"todoList",
        		routeUrl:"#/example/todoList"
        	}
        ];
	}])

	return exampleApp;
});