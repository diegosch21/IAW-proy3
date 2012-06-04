<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try {

session_start();	

if (!isset($_SESSION['user'])|| $_SESSION['user']!= 'admin'){
	$result['error'] = 'Sesion admin no iniciada';
}
else if(!isset($_POST['id']) || $_POST['id']=="" || !is_numeric($_POST['id'])){
	$result['error'] = 'Falta atributo id';
}	
else{
	
	$db = new DB('../datos/iaw_proy3');
	
	$id = $_POST['id'];
	
	$listacds = $db->query("SELECT COUNT() FROM CDs WHERE id_cd = $id");
	$exist = $db->getRow($listacds);
	
	if($exist[0] == 0) {
		//no existe cd
		$result['error'] = "CD inexistente con ID=$id";
	}
	else {
		
		$res = $db->execute("DELETE FROM CDs WHERE id_cd = ?",array($id));
		
		if($res > 0)
			$result['deleted'] = true;
		else {
			$result['deleted'] = false;
		}
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