<?PHP
	header("content-type:text/html; charset=utf-8");
	include("connent.php");


	$gets = mysql_query("SELECT * FROM perpon ");

	$arr = array();

	while ($row = mysql_fetch_array($gets)) {
		
		array_push( $arr ,$row);
	}

	

	mysql_close();


	echo json_encode($arr);


?>