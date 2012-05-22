<?php

session_start();
if (!((empty($_GET['user']))||(empty($_GET['pass'])))) {
	if (($_GET['user']=='admin')&&($_GET['pass']=='admin'))
	{
		$_SESSION['user']='admin';
	}
}
header("Location: index.php");
exit;


?>