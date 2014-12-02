<?PHP
	/*
		字符串，数字都是按值传递，修改函数内的参数不能影响外面
		担当出入的参数加上&时，就会按引用传值，修改函数内参数，会影响外面的值
	*/

	$names = "王允";

	function addName(&$names){
		$names = "abc";
		echo $names;
	};
	

	addName($names);

	echo $names;
?>