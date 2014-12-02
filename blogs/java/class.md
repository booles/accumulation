学习记录
---------------

>Java是完全面向对象的语言。Java通过虚拟机的运行机制，实现“跨平台”的理念。

#####构造器

>java的对象在创建时会初始化，初始化时数据成员会被赋予初始值，可以显式赋值，没有给数据成员赋初始值的话，数据成员会根据自身的类型赋予默认值。

>显式赋值需要在定义变量时就写好值，这很不方便。
>可以使用构造器初始化对象，可以初始化数据成员。这些操作会在对象创建时自动执行。

构造器的特点：

1. 构造器的名字和类的名字相同
2. 构造器没有返回值

定义一个构造器：

	class huMan{
		//构造器
		huMan(){
			
		};
	}

构造器是如何被调用的呢？

>没定义构造器，在对象创建时，java会提供一个空白的构造器，以便使用new时调用；定义了构造器，对象创建时，java会调用定义的构造器。

变量初始化值的优先级：

	构建方法 > 显式初始值 > 默认初始值

#####方法重载

>Java会同时根据方法名和参数列表来决定所要调用的方法，这叫做方法重载(method overloading)。

在类中，可以定义多个构造器，比如：

	class huMan{
		//构造器
		huMan(){
			
		};
		huMan(int a){
			
		};
		huMan(String b){
			
		};
	}

创建对象时，会根据传入的参数类型，来调用不同的构造器。

_Note_：普通方法也可以进行方法重载

#####封装与接口

封装：保留给外部的有限接口，隐藏具体的实现细节。特定：

* 易用性
* 安全性

对象通过三个属性来控制对象成员的外部可见性：

1. public: 外部可见
2. private: 外部不可见，内部可见
3. protected:

_Note:_在一个.java文件中，只能有一个类带有public关键字。

#####接口(interface)

接口特定：
	
1. 不需要定义方法的主体
2. 不需要说明方法的可见性

定义一个接口，使用interface关键字：

	interface Map{
		void drink(int w);
		
		int money(int mon);
	}

在类中使用，使用implements关键字：

	class MusicCup implements Map{ //也可以使用多个接口
		
		public void drink(int w){
			
		};
		
		public int money(int mon){
			
			return 0;
		}
	}

_Note:_一旦一个类使用了interface，那么它必须定义接口所定义的所有方法，不然java或报错。



#####变量

>计算机语言通常需要在内存中存放数据,Java是静态类型的语言,在使用变量之前，要声明变量的类型。

变量(variable)占据一定的内存空间。不同类型的变量占据不同的大小。Java中的变量类型如下：

>存储大小     例值     注释

>byte      1byte        3      字节

>int       4bytes       3      整数

>short     2bytes       3      短整数

>long      8bytes       3      长整数

>float     4bytes     1.2      单精度浮点数

>double    8bytes     1.2      双精度浮点数

>char      2bytes     'a'      字符

>boolean   1bit      true      布尔值

#####关于this

>注意this，它用来指代对象自身。this是隐性参数(implicit argument)。方法调用的时候，尽管方法的参数列表并没有this，Java都会“默默”的将this参数传递给方法。

	class huMan{
		public int getHeight(){
		//可以写成this.height;不写this，java会自己去判断height是类中的成员，加上this，更加清晰。
			return height; 
		};
		int height;
	}
#####数据成员初始化

只声明一个变量，初始化时并未给值，此时，基本类型会默认初始值：

	*	数值型: 0
	*	布尔值: false
	*	其他类型: null

例如，只定义了int height;那么height的默认为0；




