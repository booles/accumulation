<?PHP
	
	/*
		此时如果需要require多个php文件，要写多个require。
	*/

	/*require("./testLoad/require_load.class.php");
	require("./testLoad/require_load1.class.php");
	$test = new requireLoad();
	$test -> test();
	$test1 = new requireLoad1();
	$test1 -> test1();*/

	//--------------------------------------------------------

	/*
		自动装载(autoload)机制

		使用__autoload函数,不需要require多次,系统自动调用的函数

			1.实例化的类名要和文件同名
			2.实例化继承的类时，要把与继承有关的类放在同一个目录下。
			（没看明白：或者在实例化一个继承类的时候在文件中手工包含被继承的类；）

	*/

	/*function __autoload($className){
		$file = "./testLoad/".$className.".php";
		if(file_exists($file)){
			 require_once($file);
		}else{
			echo "加载失败";
			echo "./testLoad/".$file;
		}
	};
	//require_once();

	$load = new require_load();

	$load -> test();*/

	/*
		自己定义装载函数

			一些框架会试用这种方式

		使用spl_autoload_register传参来加载自定义的函数	
			
			spl_autoload_register(func);
			spl_autoload_register(Array(函数所在类，func));
		
		Note:spl:是Standard PHP Library(标准PHP库)的缩写。它是PHP5引入的一个扩展库，其主要功能包括autoload机制的实现及包括各种Iterator接口或类。
	*/

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

	//直接传入函数：

	/*spl_autoload_register("funcName");

	$load = new require_load();

	$load -> test();*/

	//自定义函数写在类里

	spl_autoload_register(Array("Load","funcName"));

	/*$load = new require_load();

	$load -> test();*/

?>