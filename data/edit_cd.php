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
else if(!isset($_POST['id_ar']) || $_POST['id_ar']==""){
	$result['error'] = 'Falta atributo id_ar';
}	
else if(!isset($_POST['nombre']) || $_POST['nombre']=="") {
	$result['error'] = 'Falta atributo nombre';
}	
else{
	
	$db = new DB('../db/iaw_proy3');
	
	$id = $_POST['id'];
		
	$listacds = $db->query("SELECT COUNT() FROM CDs WHERE id_cd = $id");
	$exist = $db->getRow($listacds);
	
	if($exist[0] == 0) {
		//no existe cd
		$result['error'] = "CD inexistente con ID=$id";
	}
	else {
		$nom = $_POST['nombre'];
		
		$idAr = $_POST['id_ar'];
		$artistas = $db->query("SELECT COUNT() FROM artistas WHERE id_artista = $idAr");
		$exist = $db->getRow($artistas);
		if($exist[0] == 0) {
			//no existe artista
			$result['error'] = "Artista inexistente con ID=$idAr";
		}
		else {			
			$anio = (isset($_POST['anio']) && is_numeric($_POST['anio'])) ? $_POST['anio'] : null;
			$canc = (isset($_POST['canc'])) ? $_POST['canc'] : null;   //recibe arregl? hacer implode
			$thumb = (isset($_POST['thumb'])) ? $_POST['thumb'] : null; 
			$imgs = (isset($_POST['imgs'])) ? $_POST['imgs'] : null;    //recibe un arreglo??? hacer implode(|-|)
			$link = (isset($_POST['link'])) ? $_POST['link'] : null;  		
			
			$db->execute("UPDATE CDs SET id_artista = ?, nombre = ?, anio = ?, canciones= ?,thumbnail = ?, imagenes = ?, link = ? WHERE id_cd = ?",array($idAr,$nom,$anio,$canc,$thumb,$imgs,$link,$id));
			
			//RECIBIR y actualizar TAGS (varias filas de cd-tag) (verificar si son tags q ya existen)
			
			$result = getCD($db,$id);
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