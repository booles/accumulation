
require.config({
	paths:{
		"dialog":"dist/dialog",
		"tab":"dist/tab",
		"underscore":"lib/underscore",
		"testShim":"dist/test-shim",
		"testDevs":"dist/test-devs",
		"testShimDevs":"dist/test-shim-devs"
	},
	shim:{
		"underscore":{
			"exports":"_"
		},
		"testShim":{
			"exports":"json"
		},
		"testShimDevs":{
			"deps":["testDevs"],
			"exports":"testShimDevs"
		}
	}
});


require(["dialog","testShim","testShimDevs","underscore"],function (dialog,testShim,testShimDevs,_){
	console.log(testShim);
	console.log(dialog.a);	
	testShimDevs();
	console.log(_.each);
});