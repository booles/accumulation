define(["tools"],function (tools){

	var keys = function (obj){
		if( obj == null ) return [];
		var result = [],i;
		for( i in obj ) if(tools.hasOwn(obj,i)) result.push(i);
		return result;
	};

	return keys;	
})