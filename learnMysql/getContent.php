<?php 
	header("content-type:text/html; charset=utf-8");

	$regdata = "/<font size=\"3\">((?<bf>[^<]*)<br \/>){0,1}⊙(?<bs>.{12})\S*\s/";

	//获取页面
	$html = file_get_contents('http://read.qidian.com/BookReader/3362920.aspx');  
	//$html = iconv("GBK", "UTF-8", $html);
	if ($html == '') { 
	    die("<hr />出错：【错】无法打开《青年文摘》页面<hr />");
	}

	//匹配页面信息
	preg_match_all($regdata, $html, $mdata);
	print_r($html);
	print_r($mdata);

 ?>