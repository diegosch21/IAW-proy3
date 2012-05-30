<?php
require_once('_lib/db.php');


session_start();

if (isset($_POST['user']) && isset($_POST['pass'])) {
	if (validateUser($_POST['user'], $_POST['pass'])){
		$_SESSION['user'] = 'admin';
		$_SESSION['username'] = $_POST['user'];
		unset ( $_SESSION['error'] );
	}		
	else {
		$_SESSION['error'] = 'usuario / password invalidos';
		unset ( $_SESSION['username'] );
		$_SESSION['login_attempt'] = true;
		$_SESSION['user'] = 'visit';
	}
};


header("Location: index.php");

function hayError() {
	return(isset($_SESSION['error']));
}

function getError() {
	return $_SESSION['error'];
}

function getUserName() {
	return $_SESSION['username'];
}

function getUserType() {
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