<?PHP
	//header(��content-type: text/html;charset=utf-8��);
	//�������ݿ�
	$con = mysql_connect("localhost","wangyun","11111");

	if(!$con){
		die("not " . mysql_error());
	};

	//�������ݿ�
	mysql_query("CREATE DATABASE my_test_user");

	mysql_select_db("my_test_user",$con);

?>