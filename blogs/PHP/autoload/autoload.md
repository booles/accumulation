__autoload和spl_autoload_register的使用
--------------------------------------------

先建一个这样的结构：

>文件下建立一个autoload.php
>在同一个目录下，建一个文件夹testLoad，放两个文件：testload1.php,testload2.php

#####多个require加载

如果想在autoload.php中加载testLoad下面的两个文件，通常会使用多个require加载：

	require("./testLoad/testload1.php");
	require("./testLoad/testload2.php");

如果要加载很多个文件，会用多个require，代码臃肿，不利于维护。

---

#####自动装载(autoload)机制

>使用__autoload函数,不需要require多次,系统自动调用的函数
>>1. 实例化的类名要和文件同名
2. 实例化继承的类时，要把与继承有关的类放在同一个目录下。（没看明白：或者在实例化一个继承类的时候在文件中手工包含被继承的类；）

使用方法：

	function __autoload($className){
		$file = "./testLoad/".$className.".php";
		if(file_exists($file)){
			 require_once($file);
		}else{
			echo "加载失败";
			echo "./testLoad/".$file;
		}
	};

定义完成之后，在testload1.php中会有一个类testload1，当：

	$testload1 = new testload1();

时，系统会自动调用__autoload，传入初始化的类名testload1，找到相应文件。

#####自定义装载函数
>使用spl_autoload_register传参来加载自定义的函数	
>>spl_autoload_register(func);
spl_autoload_register(Array(函数所在类，func));
>一些框架会试用这种方式

Note:spl:是Standard PHP Library(标准PHP库)的缩写。它是PHP5引入的一个扩展库，其主要功能包括autoload机制的实现及包括各种Iterator接口或类。

-------

自定义装载函数：

	class Load{
		static function funcName($className){
			$file = "./testLoad/".$className.".php";
			if(file_exists($file)){
				 require_once($file);
			}else{
				echo "加载失败";
				echo "./testLoad/".$file;
			}
		}
	}

使用：
	
	spl_autoload_register(Array("Load","funcName"));

此时再去初始化类：

	$testload1 = new testload1();

就完成了加载。

详细参考：
	1. http://www.jb51.net/article/29624.htm
	2. http://blog.csdn.net/adparking/article/details/6381878
