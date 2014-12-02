###一 扭转对事件的认知
>事件，是js和html交互的桥梁。当用户操作页面上的元素，比如点击，鼠标移入移出，然后做一些事情。
你若触发，我便执行——事件发生，调用它的处理函数执行相应的JavaScript代码给出响应。

在页面放一个元素：

`<input type="button" id="btn" />`

以onclick为例：

	var oBtn = document.getElementById("btn"); //获得按钮的引用
	//用for in打印出对象上的属性名
	for(var i in oBtn){
	console.log(i);
	}

在控制台，可以看到，onclick作为元素对象的属性存在：

![Alt 例子](./1.png)

再打印出onclick得值：

`	
	console.log(oBtn["onclick"]); //null
`

>当在页面中写一个元素的时候，这个元素本身就有事件存在，_并不是给元素添加事件，而是添加事件处理函数_。不给元素的事件指定相应的事件处理函数，作为对象的特殊属性，事件对应的值为null，则在页面中再怎么点也毫无反应。

当添加了事件处理函数：

`oBtn.onclick = function(){alert("onclick");};`

或：

	function clicnFn(){alert("clicnFn1");}
	oBtn.onclick = clicnFn;

点击页面button会执行赋给点击事件的处理函数,弹出clicnFn1。

*Note:*不要认为是给元素添加了事件，只是给元素的事件添加了事件处理函数而已。

###二 事件绑定

当在同一个元素同一事件添加不同的处理函数，如：
	
	function clicnFn1(){alert("clicnFn1");}
	function clicnFn2(){alert("clicnFn2");}
	oBtn.onclick = clicnFn1;
	oBtn.onclick = clicnFn2;

点击按钮，只会弹出clicnFn2，因为下面的赋值会覆盖上面的赋值。

那怎么解决呢？答案是使用**事件绑定**。

#####在标准浏览器（FF，chrome，ie9+），使用addEventListener，使用方法：

>	addEventListener(时间名，事件处理函数，布尔值);
>
>第三个参数为布尔值，false是冒泡时触发，true为捕获时触发，通常设为false。
除非想在到达事件目标之前，想做点事，那么设为true。（关于冒泡和捕获，会在事件流中详细讲解）

#####在ie低版本浏览器（ie6/7/8），使用attachEvent，使用方法：

>	atttachEvent(时间名，事件处理函数);
>	
>ie低版本浏览器不支持捕获，只支持冒泡。

封装兼容写法addEvent函数：

	/*
	 	@fileOverview     对事件绑定的兼容封装
		@param {oBject}   元素对象
		@param {String}   事件名
		@param {Function} 事件处理函数
	*/
	function addEvent(obj,eventName,fn){
		if(obj.attachEvent){
			obj.attachEvent("on"+eventName,function(){	//在ie低版本中，需要在事件名前加上on
				//在ie中事件绑定的处理函数this指向的window，需要用call将this指向obj,以便在事件处理函数中使用this
				fn.call(obj);	
			});
		}else{
			obj.addEventListener(eventName,fn,false);
		}
	}

使用封装函数：

	addEvent(obj,"click",clicnFn1);
	addEvent(obj,"click",clicnFn1);

*Note*:在标准浏览器和ie低版本浏览器，绑定多个函数的执行顺序有所不同。

###三 事件对象

>事件对象是一座宝藏，里面藏着用来描述事件的信息。
>例如可以在事件对象中获得,事件类型，鼠标在页面的点击的位置，点击的目标。。。等等

#####在标准浏览器（FF，chrome，ie9+）获取事件对象

>事件对象作为事件处理函数的第一个参数（包括chrome浏览器）

	function clicnFn1(ev){alert(ev);}
	oBtn.onclick = clicnFn1;

*Note*: ev是定义的参数名，这个名字可以随便设置，比如为a,b,c..。都可以。

#####在ie低版本浏览器（ie6/7/8）获取事件对象（包括chrome浏览器）

>事件对象会保存在全局对象window的一个属性中，属性名为event。

简单测试下：

	<script>
		alert(event); 
	</script>

>在ie低版本浏览器弹出null，在chrome中弹出undefined，说明这个event已经定义
>只是在ie低版本浏览器中相当于这样定义：var event = null;
>在chrome中相当于这样定义:var event;
>

*Note*:要使用全局event事件对象，必须是在事件处理函数中才能获得。

例如：

	function clicnFn1(){alert(event);}
	clicnFn1() 
>直接调用,那么会弹出null或undefined。
>因为这是直接调用函数，而不是作为事件处理函数调用。

在例如：

	function clicnFn1(){alert(event);}
	oBtn.onclick = clicnFn1;

>作为事件处理函数调用，那么函数内用到event就是我们想要的事件对象了。

事件对象兼容性封装：

	function clicnFn1(ev){
		var e = ev || event;
	};
---

事件暂时记录到这里，随后补充。。。