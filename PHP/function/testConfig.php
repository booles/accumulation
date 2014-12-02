<?PHP

if( ! defined("PATH") ){
	define("PATH",dirname(__FILE__));
}

//require(PATH."\config\config.php");

/*var_dump( configArray ); */


$path = realpath("./config");

echo $path;

echo PHP_VERSION;

?>