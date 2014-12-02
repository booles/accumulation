define(["createCallback","keys"],function (createCallback,keys){

	var forEach = function (obj,callBack,content){
		
			if(!obj) return;

			callBack = createCallback(callBack,content);//返回一个函数

			var i=0;

			if(obj.length === +obj.length){   //判断数组
				for( ;i<obj.length;i++ ){
					callBack(obj[i],i,obj);   //createCallback函数利用闭包执行了callBack
				};
			}else{							//否则为object
				var key = keys(obj);
				for( var len = key.length;i<len;i++){
					callBack(obj[key[i]],key[i],obj);
				}
			};

			return obj;

	};


	return forEach
});