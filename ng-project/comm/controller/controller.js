define(['app'],function (app){
	app.
    controller('firstCtrl', ['$scope','$rootScope', function ($scope,$rootScope) {

    }]).
    controller('contentCtrl', ['$scope', function ($scope) {
        
    }]).
    controller('headerCtrl', ['$scope', function ($scope) {
        $scope.header = "header";
    }]).
    controller('footerCtrl', ['$scope', function ($scope) {
        $scope.header = "footer";
    }]).
    controller('leftSlidCtrl', ['$scope', function ($scope) {
        $scope.left_title = [
        	{
        		name:"我的订单",
        		ch:"tab",
        		routeUrl:"#/example/order/all"
        	},
        	{
        		name:"轮播",
        		ch:"tab",
        		routeUrl:"#/example/tab"
        	},
        	{
        		name:"弹框",
        		ch:"dralog",
        		routeUrl:"#/example/dralog"
        	},
        	{
        		name:"下拉框",
        		ch:"down",
        		routeUrl:"#/example/select"
        	},
        	{
        		name:"todoList",
        		ch:"todoList",
        		routeUrl:"#/example/todoList"
        	}
        ]

    }]);  
});