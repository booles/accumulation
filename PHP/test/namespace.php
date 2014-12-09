<?php 
	namespace test;
	define('MY_NAME',111);
	define(__NAMESPACE__.'\MY_NAME',"hello,world!");

	echo \MY_NAME;      //111
	echo MY_NAME;       //hello,world!  
	echo \test\MY_NAME; //hello,world! 
 ?>