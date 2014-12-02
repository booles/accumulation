angular.module('dialogModule', ["toolsModule"]).
		service('connectService', [function () {
			this.fn = function (scope){
					console.log(scope.first);
			};
		}]).
		factory('connect', ["$window","$document","$compile","$interpolate","toolsfactory",function ($window,$document,$compile,$interpolate,toolsfactory){	
			
			var dom = {
				connectFn:function ($scope,params,defaultArr){

					var defaultArrArr = $scope[defaultArr];

					angular.extend(defaultArrArr,angular.fromJson(params));

					$scope.defaultArr = defaultArrArr;
					var func = function (data){
				   		var bodyH = data.bodyH,windowW=data.windowW,windowH = data.windowH;
						$scope.css = {
							background: "#333",
						 	opacity: "0.2",
						 	width: windowW+"px",
						 	height:bodyH+"px"
						};	
						$scope.dialogCss = {
							width: defaultArrArr.width+"px",
							height: defaultArrArr.height+"px",
							left:(defaultArrArr.left || (windowW-defaultArrArr.width)/2)+"px",
							top:(defaultArrArr.top || (windowH-defaultArrArr.height)/2)+"px",
						};	
				   	}	

				   toolsfactory.windowAndBodyWh(function (data){
				   		func(data);	
				   		
				   });
					angular.element($window).on("resize",function (){
						$scope.$apply(toolsfactory.windowAndBodyWh(function (data){
								func(data);
						}));	
					});
					//内容区
					var dialogTemp = $interpolate("<div class='dialogContent' ng-style='dialogCss' x-mask-direc></div>")();
					$scope.dialog = $compile(dialogTemp)($scope);					
					//遮罩层
					if(defaultArrArr.mask){
						$scope.maskDiv = $compile("<div class='mask' ng-style='css'></div>")($scope);
					};					
				},
				appendChildFn:function ($scope){
					$document.find("body").append($scope.dialog);
				    $document.find("body").append($scope.maskDiv);
				}	
			};
			return dom
		}]).
		directive('maskDirec', ["$compile",function ($compile) {
			return {
				restrict: 'A',
				link: function ($scope, iElement, iAttrs) {
					var temp = $compile($scope.defaultArr.content)($scope);
					iElement.append(temp);
				}
			};
		}]).
		directive('dialogDiv', ["connect","connectService",function (connect,connectService){
			return {
				restrict: 'A',
				scope:{},
				link: function ($scope, iElement, iAttrs) {	
						/*$scope.defaultArr = {
							width: 400,
							height: 300,
							mask:true,
							content: "<p>hello dialog!</p>"
						};			
						connect.connectFn($scope,iAttrs.dialogDiv || $scope.defaultArr,"defaultArr");
					var eventTypes = angular.fromJson(iAttrs.dialogDiv || $scope.defaultArr).eventType || "click";
						iElement.on(eventTypes,function (){
							connect.appendChildFn($scope);
						});*/

					iElement.on("click",function (){
							connectService.fn();
					})

				}
			};
		}]);