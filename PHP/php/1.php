<?PHP

	//echo $_SERVER['HTTP_USER_AGENT'];   //输出浏览器的信息

	/*$arr = array("a"=>1,"b"=>2);

	echo json_encode($arr);
*/
	header("content-type:text/html; charset=utf-8");
	include("connent.php");
	


	$getUser = $_POST["user"];
	$getPassWord = $_POST["passWord"];
	$submit = $_POST[submit];

	if(isset($submit)){
		echo "表单已提交！";
	//	header("localhost/PHP/2.html");
	}

	
	
	mysql_query( "INSERT INTO perpon (userName,passWord) VALUES ('$getUser',$getPassWord)");

	mysql_close($con);


/*	$url = "../login.html";  
	echo "<script type='text/javascript'>";  
	echo "window.location.href='$url'";  
	echo "</script>"; */ 

	echo $getUser;
	
?>