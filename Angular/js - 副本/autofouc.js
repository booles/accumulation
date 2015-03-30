myApp.directive("autofocus",function ($timeout){
	return function (scope,ele,attr){

		scope.$watch(attr.autofocus,function (newval){
			if(newval){
				$timeout(function () {
						ele[0].focus();
					}, 0, false);
			}	
		});
			
	}	
});