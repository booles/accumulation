<?PHP
	//header("content-type:text/html; charset=utf-8");

	include("conn_mysql.php");

	$userName = $_POST["userName"];
	$passWord = $_POST["passWord"];

	$serch_user_name = mysql_query("SELECT * FROM storage_user WHERE userName='$userName'");
	
	if(mysql_fetch_array($serch_user_name)){
		echo "<script>location.href='../register.html';</script>";
	}else{
		$insert2 = "INSERT INTO storage_user (userName,password) VALUES ('$userName','$passWord')";
		mysql_query($insert2);
	};


	mysql_close($con);
?>