angular.module('toolsModule', []).
factory('toolsfactory', ["$window","$document","$http","$q",function ($window,$document,$http,$q) {
	var tool = {};
	//body的高度和可是区宽度
	tool.windowAndBodyWh = function (func){
		var bodyH = $document[0].body.clientHeight,
			bodyW = $document[0].body.clientWidth,
			windowW = $window.innerWidth,
			windowH = $window.innerHeight;
		unc = func  || function(){};
		return func({
			bodyH:bodyH ,
			bodyW: bodyW,
			windowW:windowW,
			windowH:windowH
		}) 
	};


	tool.httpRquest = function (){
		var defer = $q.defer();
		$http({
			mothod:"GET",
			url:"../tempHtml/dialogTemp.html"
		}).success(function (data){
			defer.resolve(data);	
		}).error(function (){
			
		});
		return defer.promise;
	};


	return tool;
}])