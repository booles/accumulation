/*
	利用函数的静态方法
*/

var unit = function (){
	if(typeof unit.chace === "object"){
		return unit.chace;
	};

	unit.chace = this;
};

var Unit = new unit();
var Unit2 = new unit();

//console.log(Unit === Unit2);


/*
	缓存实例
*/
var twoUnit = function (){
	var cache = this;

	twoUnit = function (){
		return cache;	
	};

};

twoUnit.prototype.nothing = function (){
	console.log("nothing");	
};



var TwoUnit = new twoUnit();

//console.log(TwoUnit.constructor === twoUnit);

twoUnit.prototype.everything = function (){
	console.log("everything");	
};

var TwoUnit2 = new twoUnit();


//TwoUnit.nothing();
/*TwoUnit.everything();
*/

//console.log(TwoUnit === TwoUnit2);


var threeUnit = function (){
	var cache;

	threeUnit = function (){
		return cache;	
	};

	threeUnit.prototype = this;

	cache = new threeUnit();

	cache.constructor = threeUnit;


	return cache;
};
threeUnit.prototype.nothing = function (){
	console.log("nothing");	
};
var Three = new threeUnit();
var Three2 = new threeUnit();

threeUnit.prototype.eveything = function (){
	console.log("eveything");	
};

//console.log(Three === Three2);
//console.log(Three.constructor === threeUnit);

//Three.nothing();
//Three.eveything();

/*
	工厂方法
*/

var model = function (){

	var instace;

	model = function (){
		return instace;	
	};

	model.prototype = this;

	instace = new model;

	instace.constructor = model;

	return new instace();

};

model.factory = function (name,factoryFn){
	alert(Object.prototype.toString.call(arguments));
	console.log(name);	
};

model.factory("hello",function (){
		
});


var foo = function (){
		console.log(foo);
};





