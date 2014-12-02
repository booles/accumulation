define(["createCallback","keys"],function (createCallback,keys){

	var map = function (obj,callBack,content){
			if( obj == null ) return [];

			callBack = createCallback(callBack,content);

			var key = obj.length !== +obj.length && keys(obj), //判断如果是object的话，返货key值
				len = (key || obj).length,                     //为object的话返回key的length，否则直接返回obj的length
				results = Array(len),							//创建一个数组，将要返回
				currentKey,
				i = 0;

			for(;i<len;i++){
				currentKey = key ? key[i] : i;				//如果为object为key值，为数组为索引值i
				results[i] = callBack(obj[currentKey],currentKey,content);  //执行callba，返回穿件来的callBack返回的值
			};	

			return results;

	};

	return map;	
});