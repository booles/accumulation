define(["angular","custom_test"],function (angular){
		angular.module('httpModule', ["test"]).
		controller('leftSlidCtrl', ['$scope', function ($scope) {
			console.log("111");
		}])
		.service('testQ', ["$q","test1",function ($q,test1) {
	            return function (){
	            	test1();
	                console.log("22222222222222"); 

	            }
	    }]);
});