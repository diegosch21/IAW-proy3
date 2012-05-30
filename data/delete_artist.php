<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try {

session_start();	

if (!isset($_SESSION['user'])){
	$result['error'] = 'Sesion no iniciada';
}
else if(!isset($_POST['id']) || $_POST['id']=="" || !is_numeric($_POST['id'])){
	$result['error'] = 'Falta atributo id';
}	
else{
	
	$db = new DB('../db/iaw_proy3');
	
	$id = $_POST['id'];
	
	$table = $db->query("SELECT COUNT() FROM artistas WHERE id_artista = $id");
	$exist = $db->getRow($table);
	
	if($exist[0] == 0) {
		//no existe cd
		$result['error'] = "Artista inexistente con ID=$id";
	}
	else {
		
		$res = $db->execute("DELETE FROM artistas WHERE id_artista = ?",array($id));
		
		if($res > 0)
			$result['artist_deleted'] = true;
		else {
			$result['artist_deleted'] = false;
		}
		
		$res = $db->execute("DELETE FROM CDs WHERE id_artista = ?",array($id));
		$result['CDs_deleteds'] = $res;
	}
	
	
	$db->disconnect();
}

} catch(Exception $e){
	$result['error'] = $e->getMessage();
}

if(isset($result['error']))	
	echo json_encode($result);
else if(isset($result))
	echo json_encode($result);


?>