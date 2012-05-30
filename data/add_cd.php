<?php

require_once('../_lib/db.php');
require_once('../_lib/data.php');

try{

session_start();	

if (!isset($_SESSION['user'])|| $_SESSION['user']!= 'admin'){
	$error['error'] = 'Sesion admin no iniciada';
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
		$cant_img = (isset($_POST['cant_img'])) ? $_POST['cant_img'] : 0;
		$img = array();
		for ($i=1;$i<=$cant_img;$i++) {
			$img[$i-1] = (isset($_POST['img'.$i])) ? $_POST['img'.$i] : "";
		}
		$imgs = implode("|-|",$img);
		$link = (isset($_POST['link'])) ? $_POST['link'] : null;  		
		
		$db->execute("INSERT INTO CDs VALUES(?,?,?,?,?,?,?,?,0,0)",array($id,$idAr,$nom,$anio,$canc,$thumb,$imgs,$link));
		
		
		$cant_tag = (isset($_POST['cant_tag'])) ? $_POST['cant_tag'] : 0;
		$tags = array();
		for ($i=1;$i<=$cant_tag;$i++) {
			$tags[$i-1] = (isset($_POST['tag'.$i])) ? $_POST['tag'.$i] : "";
		}
		//Inserta TAGS (verifica si son tags q ya existen)
		$id_tags = addTags($db,$tags);
		foreach($id_tags as $idTag) {
			$db->execute("INSERT INTO cd_tag VALUES(?,?)",array($id,$idTag));
		}
		
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