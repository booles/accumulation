一个关于arguments的问题：
--------------------------
#### 问题：

	var arr = (function () {
	  return arguments[0]();
	})(function(){return this;},"cccc");

	console.log(arr); //arr是多少？

##### 分析

>1. 假如数组有一项为函数，直接来调用数组中的函数，函数里的this指向谁？

>2. 要确定this的值，首先要分析函数是被谁调用的，被谁调用，this就会指向谁。

明白解决以上两个问题，那么这个答案立马就会浮出水面。

###### 数组中的函数

	var obj = {fn:function(){return this;}};

	console.log(obj["fn"]() === obj);  //true this为obj

	var arr = [function(){return this;}];

	console.log((arr[0])() === arr);  //true this为arr

使用数组形式去调用函数，this指向数组

所以以上答案返回的是[function(){return this;},"cccc"] 也就是arguments。


