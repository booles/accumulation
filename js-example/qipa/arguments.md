一个关于arguments的问题：
--------------------------
`var arr = (function () {
	  return arguments[0]();
	})(function(){return this;},"cccc");

	console.log(arr); //arr是多少？`
