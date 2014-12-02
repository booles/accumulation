<?PHP
	class Person {
		var $age;

		function getAge(){
				echo "得到年龄！";
		}
	};

	$p1 = new Person();

	$p1->$age = "10";

	//echo $p1->$age;
	
?>