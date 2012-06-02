<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try {

if(isset($_GET['id']) && is_numeric($_GET['id'])) { //id cd

	$db = new DB('../db/iaw_proy3');
	$id = $_GET['id'];	
	$db->execute("UPDATE CDs SET visitas = visitas+1 WHERE id_cd= ?",array($id));
	$result = getCD($db,$id);
	$db->disconnect();
} 
else {	
	$result['error'] = 'Falta parametro id';
}

} catch(Exception $e){
	$result['error'] = $e->getMessage();
}

if(isset($result['error']))	
	echo json_encode($result);
else if(isset($result))
	echo json_encode($result);


?>