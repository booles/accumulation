<?PHP

	$con = mysql_connect("localhost","wangyun","11111");
	mysql_query("set names utf8");
	if(!$con){
		die('Could not connect: ' . mysql_error());
	};


	mysql_query('CREATE DATABASE my_test_db',$con);

	mysql_select_db('my_test_db',$con);

	$createTable = 'CREATE TABLE persons 
					(
						personID int,
						FristName varchar(15),
						LastName varchar(15),
						Age int
					)';

	mysql_query($createTable,$con);

	$insertData = "INSERT INTO persons (FristName,LastName,Age) VALUES ('$_POST[firstName]','$_POST[lastName]','$_POST[age]')";

	mysql_query($insertData,$con);
	echo "1 record added";

	mysql_close($con);


?>