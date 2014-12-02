myApp.directive("todoescape",function(){
	var keyCode = 27;
	return function ($scope,ele,attr){
		ele.bind("keydown",function (event){
			
			if(event.keyCode === keyCode) {

				$scope.$apply(attr.todoescape);
			};
				
		});

	};	
	
});