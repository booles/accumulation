解析jQuery中extend方法--用法《一》
---------------------------
extend方法在jQuery中是一个很重要的方法，jQuey内部用它来扩展属性方法。常用语jQuery插件开发。

jQuery提供了两个方法，$.extend和$.fn.extend,两个方法内部实现一样，但功能用法却不一样，按照官方解释：

> jQuery.extend(): Merge the contents of two or more objects together into the first object.(把两个或者更多的对象合并到第一个当中)

> jQuery.fn.extend():Merge the contents of an object onto the jQuery prototype to provide new jQuery instance methods.(把对象挂载到jQuery的prototype属性，来扩展一个新的jQuery实例方法)

简单来说：$.extend(),是用来扩展jQuery静态方法；$.fn.extend()是用来扩展jQuery实例方法。

##### 用法：
``` javascript
	//扩展静态方法：
	$.extend({
		sayName:function (){
			console.log("My name is jQuery");	
		}
	});

	$.sayName(); //"My name is jQuery"

	//扩展实例方法：
	$.fn.extend({
		check: function() {
			return this.each(function() {
				this.checked = true;
			});
		}
	});

	$( "input[type='checkbox']" ).check(); //所有的checkbox都会被选择

```
*Note:*扩展的静态方法，直接使用$调用；扩展的实例方法，要用$()调用。

##### extend的参数

```
	extend(dest,src1,src2...srcN);//可以传入N多个对象
```
参数的含义：将src1,src2...srcN的每一项合并为dest的每一项，并返回合并后的对象：

```
	var dest = {name:"job",age:20},src1 = {name:"tom",live:"Beijing"};

   	$.extend(dest,src1);

   	console.log(dest);  //{name: "tom", age: 20,live:"Beijing"}

```
*Note:*dest的结构会发生变化

如果想得到合并的结果，并不修改dest的结构，可以这么做：
```
var newSrc = $.extend({},dest,src1,src2...srcN);
```
newSrc就是得到的新对象

这样的做法在写插件，设置默认值时会用到，比如写一个dialog插件,设置了弹框的基本样式：

```
	(function ($){
   		$.fn.extend({
   			dralog:function (options){
   				//设置默认样式
   				var deafualt = {
					width:100,
					height:100
				};
				//传过来的参数覆盖默认值
				var style = $.extend({},deafualt,options);

				console.log(style); //deafualt变为：{width: 200, height: 200}

				$("div").css(style)
   			}
   		});	
   	})(jQuery);

   	$().dralog({
   		width: 200,
   		height: 200
   	});
```
当extend只有一个参数时：

```
	extend(dest);
```
1. $.extend(dest)

> 将dest的每一项合并到jQuery全局对象中

```
	$.extend({name:"tom"});
```
使用：
```
	$.name
```
2. $.fn.extend(dest)

> 将dest的每一项合并到jQuery的实例中

```
	$.fn.extend({name:"tom"});
```
使用：

```
	$().name
```
在jQuery对象扩展一个命名空间：

```
	$.extend({nameScope:{}});

	$.extend($.nameScope,{name:"tom"});
```
将name添加到nameScope这个命名空间中

当extend的第一参数为布尔值：
```
	extend(Boolean,src1,src2...srcN);
```
Boolean为true时，为深层拷贝；Boolean为false时，为浅拷贝。

有两个对象：
```
	var src1 = {name:"tom",location:{city:"Beijing",county:"China"}};
	var src2 = {name:"job",location:{live:"New York",county:"USA"}};

```
Boolean为true:
```
	$.extend(true,src1,src2);
```
合并后，src1为：

```
	{name: "job", location: {city: "Beijing",county: "USA",live: "New York"}}
```
> 里面的子元素也会进行合并

Boolean为false:
```
	$.extend(false,src1,src2);
```
合并后，src1为：

```
	{name: "job", location: {city: "Beijing",county: "China"}}
```
> 里面的子元素不会合并，直接覆盖

extend是写jQuery插件的利器，以上是关于如何使用它的细节，接下来会分析jQuery如何来实现extend方法。

参考：http://api.jquery.com/jQuery.extend/
	  http://www.cnblogs.com/RascallySnake/archive/2010/05/07/1729563.html
