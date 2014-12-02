define(function (){

	var tools = {
		hasOwn:function (obj,val){
			return obj != null && hasOwnProperty.call(obj,val);
		},
	}

	return tools;	
})