define(['app'],function (app){
	app.
    controller('firstCtrl', ['$scope', function ($scope) {
        $scope.template = {
            left_silder_tpl:'./modules/left_silder/left_silder.html'
        };
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
        		name:"轮播",
        		routeUrl:"#/routeTpl/tab"
        	},
        	{
        		name:"弹框",
        		routeUrl:"#/routeTpl/dralog"
        	}
        ]

    }]);  
});