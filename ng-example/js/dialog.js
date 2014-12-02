angular.module('dialogModule', ["toolsModule"]).
run(function ($templateCache,toolsfactory){
	/*var dialogHtml = null;
	toolsfactory.httpRquest().then(function (data){
		dialogHtml = data;	
		$templateCache.put("dialogContent.html",dialogHtml);
	});*/
	var dialogHtml = "<div class='default-dialog-top'>"+
						"<p>{{title}}</p>"+
						"</div>"+
						"<div class='content' x-dialog-content></div>"+
						"<div class='default-dialog-bottom'></div>"
	$templateCache.put("dialogContent.html",dialogHtml);	
}).
		factory('connect', ["$window","$document","$compile","$interpolate","toolsfactory",function ($window,$document,$compile,$interpolate,toolsfactory){	
			
			var dom = {
				connectFn:function ($scope,params,defaultParam){
					var defaultArrArr = $scope.defaultArr;
					angular.extend(defaultArrArr,params);
					var func = function (data){
				   		var bodyH = data.bodyH,windowW=data.windowW,windowH = data.windowH;
						$scope.css = {
							background: "#333",
						 	opacity: "0.2",
						 	width: windowW+"px",
						 	height:bodyH+"px"
						};	

						$scope[defaultParam+"dialogCss"] = {
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
					 $scope.bindScope = defaultArrArr["bindScope"] ? (defaultArrArr["bindScope"]) : function (){};
					 $scope.dialogContents = defaultArrArr.content ? defaultArrArr.content : "";
					  $scope.title = defaultArrArr.title ? defaultArrArr.title : "";

					  $scope.isShow = true;

					//内容区
					$scope[defaultParam+"dialogTemp"] = "<div class='dialogContent' ng-show='isShow' ng-controller='dialogCtrl' isshow='isShow' ng-style='"+defaultParam+"dialogCss"+"' title='{{title}}'"+
														" x-mask-direc bindscope='bindScope' dialogcontents='{{dialogContents}}'></div>";
					$scope[defaultParam+"dialog"] = $compile($scope[defaultParam+"dialogTemp"] )($scope);

					//遮罩层
					if(defaultArrArr.mask){
						$scope[defaultParam+"mask"] = $compile("<div class='mask' ng-style='css'></div>")($scope);
					};	
				},
				appendChildFn:function ($scope,defaultParam){
					$document.find("body").append($scope[defaultParam+"dialog"]);
				    $document.find("body").append($scope[defaultParam+"mask"]);
				}	
			};
			return dom
		}]).
		directive('maskDirec', ["$compile","$templateCache",function ($compile,$templateCache) {
			return {
				restrict: 'A',
				scope:{
					bindscope:"=",
					dialogcontents:"@",
					title:"@",
					isshow:"&"
				},
				controller:function ($scope){
					this.dialogcontents = $scope.dialogcontents;
					this.title = $scope.title;
					this.isShow = $scope.isShow;
				},
				template:"<div class='default-dialog-top' x-dialog-top>"+
						"<p>{{titles}}</p><span ng-click='hideDialog()'>X</span>"+
						"</div>"+
						"<div class='content' ng-click='ngfn()' x-dialog-content></div>"+
						"<div class='default-dialog-bottom'></div>",
				link: function ($scope, iElement, iAttrs) {

					var curryHtml = angular.element(iElement).html();
						$scope.bindscope($scope);

						console.log($scope.isshow);
						/*$scope.hideDialog = function (){
							$scope.isShow = !$scope.isShow;	
							console.log("11");
						};*/

					}
			};
		}]).
		directive('dialogTop', [function () {
			return {
				restrict: 'A',
				require:"^maskDirec",
				link: function (scope, iElement, iAttrs,maskDirec) {
					scope.titles = maskDirec.title;
				}
			};
		}]).
		directive('dialogContent', ["$compile",function ($compile) {
			return {
				restrict: 'A',
				require:"^maskDirec",
				link: function ($scope, iElement, iAttrs,maskDirec) {
					var temp = $compile(maskDirec.dialogcontents)($scope,function (a,b){
							iElement.append(a);						
						});
				}
			};
		}]).
		directive('dialogDiv', ["connect","$compile","$timeout",function (connect,$compile,$timeout){
			return {
				restrict: 'A',
				link: function ($scope, iElement, iAttrs) {	
						$scope.defaultArr = {
							width: 400,
							height: 300,
							mask:true,
							title:"default-dialog",
							content: "<p>hello dialog!</p>"
						};		
						connect.connectFn($scope,$scope[iAttrs.dialogDiv] || $scope.defaultArr,iAttrs.dialogDiv||"defaultArrA");
					var eventTypes = ($scope[iAttrs.dialogDiv] || $scope.defaultArr).eventType || "click";
					
						iElement.on(eventTypes,function (){							
							$timeout(function (){
								connect.appendChildFn($scope,iAttrs.dialogDiv || "defaultArrA");		
							},0)					
						});


				}
			};
		}]).
		controller('dialogCtrl', ['$scope', function ($scope) {
			console.log($scope.isShow);
			$scope.hideDialog = function (){
				$scope.isShow = !$scope.isShow;	
				console.log("11");
			};
		}])