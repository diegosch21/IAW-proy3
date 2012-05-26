<?php
require_once('_lib/db.php');


session_start();

if (isset($_POST['user']) && isset($_POST['pass'])) {
	if (validateUser($_POST['user'], $_POST['pass'])){
		$_SESSION['logged'] = $_POST['user'];
		unset ( $_SESSION['error'] );
	}		
	else {
		$_SESSION['error'] = 'usuario / password invalidos';
		unset ( $_SESSION['logged'] );
		$_SESSION['login_attempt'] = true;
	}
};


header("Location: index.php");

function hayError() {
	return(isset($_SESSION['error']));
}

function getError() {
	return $_SESSION['error'];
}

function getUserId() {
	return $_SESSION['logueado'];
}



function validateUser($user, $pass) {
	//$db = openDB();
	$db = new DB("db/iaw_proy3");
	$usuarios = $db->query("SELECT pass FROM usuarios WHERE user='$user'");
	$usuario = $db->getRow($usuarios); 
	//var_dump($usuario[0])	;
	$claveEncriptada = $usuario[0]; 
	$db->disconnect();
	//echo md5($pass);
	return strcmp($claveEncriptada, md5($pass)) == 0;
	
}



exit;


?>