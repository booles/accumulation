
require.config({
	baseUrl:"./dist/",
	paths:{
		"tools":"tools",
		"keys":"keys",
		"createCallback":"createCallback",
		"forEach":"forEach",
		"map":"map"
	}
});


require(["map"],function (forEach){
	var result = forEach({"a":1,"b":2},function (value,index){
		return index+"haha";
	});

});