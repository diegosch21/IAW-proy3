<?php

require_once('../_lib/db.php');

session_start();	

if (isset($_SESSION['user'])) {
	
//obtengo data de $_POST	
//borro de la BD
//quito CDs???
	
}
else {
	$error['error'] = 'Sesion no iniciada';
	echo json_encode($error);
	
}


?>