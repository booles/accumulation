<?PHP

	$con = mysql_connect("localhost","wangyun","11111");
	mysql_query("set names utf8");
	if(!$con){
		die('Could not connect: ' . mysql_error());
	};

	mysql_select_db('my_test_db',$con);

	$serch = mysql_query('SELECT * FROM persons');
	
	
	while($row = mysql_fetch_array($serch)){
		echo $row['FristName'] . "<br/>";
	};

	mysql_close($con);


?>