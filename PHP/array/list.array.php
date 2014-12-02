<?PHP
	
	/*
		list:
			list() 函数用数组中的元素为一组变量赋值。
			与array() 类似，list() 实际上是一种语言结构，不是函数。
			该函数只用于数字索引的数组，且假定数字索引从 0 开始。	
	*/

	$array = array("1","2");
	//echo $array[0]+"\n";

	$names[0] = "wang";
	$names[1] = "yun";

	//print_r($names);

	$arrayList = array("0"=>"yun","zhang"=>"chao");

	list($a,$b) = $arrayList;

	echo $a;

	$list = array("1"=>"dog","23"=>"22");

	list($dog,$cat) = $list;

	echo $dog;
	echo $cat;
?>