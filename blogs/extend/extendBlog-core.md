##### 源码解析
在解析代码之前，首先要了解extend函数要解决什么问题，以及传入不同的参数，会达到怎样的效果。extend函数内部就是来处理传入的不同参数,返回处理后的对象。

extend函数是对一个对象的扩展，增加属性和方法。

传入的参数有以下形式: 

> 详细参见：[解析jQuery中extend方法--用法《一》](http://www.cnblogs.com/floatboy/p/jQuery-extend.html)

1. 可以传入N多个参数,将src1，src2..srcN的每一项合并到dest中
```
	extend(dest,src1,src2...srcN);
```
2. 只传入一个对象时，$.extend()，给jQuery扩展静态方法；$.fn.extend(),给jQuery扩展实例方法。
```
	extend(dest);
```
3. 第一个参数为布尔值，为true完成深层拷贝，为false完成浅拷贝。
```
	extend(Boolean,src1,src2);
```

了解到extend传入的参数，那么分析源码就很清晰：

```
jQuery.extend = jQuery.fn.extend = function() {
	/*
		传入的对象分为扩展对象和被扩展对象
	*/
	var options, name, src, copy, copyIsArray, clone, //
		target = arguments[0] || {},	//被扩展的对象
		i = 1,							//设置扩展对象的起始值，默认从第二项开始
		length = arguments.length,		//传递参数的个数，以便下面循环扩展对象使用
		deep = false;					//默认浅复制

	/*
		处理深层拷贝或浅拷贝情况
		extend(Boolean,src1,src2..srcN);
	*/
	if ( typeof target === "boolean" ) {

		deep = target;	//将deep设为target，此时target为传进来的Boolean值，true or false；

		target = arguments[ i ] || {};  //重新设置被扩展对象，为参数的第二项

		i++;	//重设扩展对象的起始值，从第三项开始
	}

	/*
		被扩展的不是对象或函数，可能是String，Number或其他；
		extend("",src1,src2...srcN);
	*/

	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {}; //重新设置target的值为空对象
	}

	/*
		当只传入一个对象
		extend(src1);
		将target设为jQuery对象或者jQuery.prototype，来扩展jQuery静态属性方法或是实例属性方法
		$.extend(src1);   //扩展jQuery对象
		$.fn.extend(src1) //扩展jQuery.prototype
	*/
	if ( i === length ) {
		target = this;
		i--;	//重设扩展对象起始值，从第0个开始
	}

	/*
		被扩展对象和扩展对象所有情况处理完毕，开始循环进行拷贝
		对从i开始的多个参数进行遍历
	*/

	for ( ; i < length; i++ ) {
		
		if ( (options = arguments[ i ]) != null ) {  //只处理有定义扩展对象
			//扩展基本对象
			for ( name in options ) {       //循环每一项扩展对象
				src = target[ name ];		
				copy = options[ name ];		

				// 防止循环引用，window === window.window.window
				if ( target === copy ) {
					continue;
				}

				/*
					对象或数组做深拷贝
					deep：判断是否要深拷贝
					copy:保证copy存在
					jQuery.isPlainObject：判断copy是否是一个纯粹的对象，通过{} 或 new Object 创建
					jQuery.isArray:判断是否为数组
				*/
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					//为数组
					if ( copyIsArray ) {
						copyIsArray = false; //设为false，以便下次再重新判断是否为数组
						clone = src && jQuery.isArray(src) ? src : [];  //设置clone为一个数组

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {}; //设置clone为一个对象
					}

					//递归深度拷贝
					target[ name ] = jQuery.extend( deep, clone, copy );

				//过滤未定义的值
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	//返回修改后的对象
	return target;
};
```
内部源码不是很复杂，主要是处理传入的不同参数。这个函数的实现，真正要理解的其实是递归。

##### 递归

> 递归，就是在运行的过程中调用自己。

递归调用把我搞的七荤八素，一直不能想象和理解它是怎样的一个运算过程。为此我已郁闷好久，在某天与一位大牛的聊天中无意提起递归，在大牛的讲解举例，琢磨回味一番后，终于算是理解了递归是怎么一回事。不知准不准确，但至少再看到递归调用的函数时，脑子立马清晰呈现递归调用是怎么一回事。

以阶乘为例：
```
	function recursion(num){
		if( num < 1 ) {  //满足条件，终止递归调用
			return 1;
		};
		return recursion( num - 1 ) * num;
	};
	recursion(6); //720
```
简单的递归运算，说说它的原理。




望批评斧正！





