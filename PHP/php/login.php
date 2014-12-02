<?PHP

	header("content-type:text/html; charset=utf-8");
	include("connent.php");
	


	$userName = $_POST["user"];
	$passWord = $_POST["passWord"];
	$submit = $_POST[submit];


		$sqlVal = mysql_query("SELECT * FROM perpon");

		while ($row = mysql_fetch_array($sqlVal)) {
			$user = $row["userName"];
			$pass = $row["passWord"];
			if($user === $userName && $pass === $passWord){
				$url = "../liuyan.html";  
				echo "<script type='text/javascript'>";  
				echo "window.location.href='$url'";  
				echo "</script>";  
			};

			

		};

	

		

?>