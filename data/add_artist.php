<?php

require_once('../_lib/db.php');

session_start();	

if (isset($_SESSION['user'])) {
	
//obtengo data de $_POST	
//agrego en la BD
	
}
else {
	$error['error'] = 'Sesion no iniciada';
	echo json_encode($error);
	
}


?>