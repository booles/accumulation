function tip(arr,n){
	return Array.prototype.join.call({
		length:n+1
	},arr)
};

console.log(tip("wap",2));


console.log(Array.prototype.join.call({length:4}));


var arr = new Array(3);

console.log(arr.join("a"));

/*var obj = {
    length:0,
    splice:Array.prototype.splice
};
console.log( obj ); // 打印：[]*/

var push = Array.prototype.push;
var obj = {};
push.call(obj, "hello"); // 返回值 1
	console.log(obj);

// obj {"0":"hello", length:0}
push.call(obj, "world"); // 返回值 2
console.log(obj);
// obj {"0":"hello", "1":"world",length:2}




/*
	try catch
*/

try{
	b();
}catch(e){
	console.log(e);
}

