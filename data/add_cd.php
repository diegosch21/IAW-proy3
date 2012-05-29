<?php

require_once('../_lib/db.php');
require_once('../_lib/data.php');

try{

session_start();	

if (!isset($_SESSION['user'])){
	$error['error'] = 'Sesion no iniciada';
}
else if(!isset($_POST['id_ar']) || $_POST['id_ar']=="" || !is_numeric($_POST['id_ar'])){
	$error['error'] = 'Falta atributo id_ar';
}	
else if(!isset($_POST['nombre']) || $_POST['nombre']=="") {
	$error['error'] = 'Falta atributo nombre';
}	
else{
	
	$db = new DB('../db/iaw_proy3');
	
	$idAr = $_POST['id_ar'];
	$artistas = $db->query("SELECT nombre FROM artistas WHERE id_artista = $idAr");
	$art = $db->getRow($artistas);
	if (!$art) {
		//no existe artista
		$error['error'] = "Artista inexistente con ID=$idAr";
	}
	else {
		$artista = $art[0];
		
		$nom = $_POST['nombre'];
		$listacds = $db->query("SELECT MAX(id_cd) FROM CDs");
		$cd = $db->getRow($listacds);
		$id = $cd[0]+1;
		
		$anio = (isset($_POST['anio']) && is_numeric($_POST['anio'])) ? $_POST['anio'] : null;
		$canc = (isset($_POST['canc'])) ? $_POST['canc'] : null;   //recibe arregl? hacer implode
		$thumb = (isset($_POST['thumb'])) ? $_POST['thumb'] : null; 
		$imgs = (isset($_POST['imgs'])) ? $_POST['imgs'] : null;    //recibe un arreglo??? hacer implode(|-|)
		$link = (isset($_POST['link'])) ? $_POST['link'] : null;  		
		
		$db->execute("INSERT INTO CDs VALUES(?,?,?,?,?,?,?,?,0,0)",array($id,$idAr,$nom,$anio,$canc,$thumb,$imgs,$link));
		
		//RECIBIR e insertar TAGS (verificar si son tags q ya existen)

		$result = getCD($db,$id);
		

	}
	
	$db->disconnect();
}
} catch(Exception $e){
	$result['error'] = $e->getMessage();
}

if(isset($error['error']))	
	echo json_encode($error);
else if(isset($result))
	echo json_encode($result);


?>