<?PHP
$con = mysql_connect("localhost","root","11111");
mysql_query("set names utf8");

if(!$con)
	{
		die("连接出错:".mysql_error());
	};


	mysql_select_db("my_db",$con);


	mysql_query($sql,$con);
?>