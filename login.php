<?php
require_once('_lib/db.php');


session_start();

if (isset($_POST['user']) && isset($_POST['pass'])) {
	if (validateUser($_POST['user'], $_POST['pass'])){
		$_SESSION['user'] = $_POST['user'];
		unset ( $_SESSION['error'] );
	}		
	else {
		$_SESSION['error'] = 'usuario / password invalidos';
		unset ( $_SESSION['user'] );
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
	return $_SESSION['user'];
}



function validateUser($user, $pass) {

	$db = new DB("db/iaw_proy3");
	$usuarios = $db->query("SELECT pass FROM usuarios WHERE user='$user'");
	$usuario = $db->getRow($usuarios); 

	$claveEncriptada = $usuario[0]; 
	$db->disconnect();

	return strcmp($claveEncriptada, md5($pass)) == 0;
	
}


exit;


?>