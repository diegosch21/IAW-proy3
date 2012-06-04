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
else if(!isset($_POST['id_ar']) || $_POST['id_ar']==""){
	$result['error'] = 'Falta atributo id_ar';
}	
else if(!isset($_POST['nombre']) || $_POST['nombre']=="") {
	$result['error'] = 'Falta atributo nombre';
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
			/*
			$cant_img = (isset($_POST['cant_img'])) ? $_POST['cant_img'] : 0;
			$img = array();
			for ($i=1;$i<=$cant_img;$i++) {
				$img[$i-1] = (isset($_POST['img'.$i])) ? $_POST['img'.$i] : "";
			}
			 * */
			//$imgs = implode("|-|",$img);
			$imgs = (isset($_POST['imgs'])) ? $_POST['imgs'] : "";
			$link = (isset($_POST['link'])) ? $_POST['link'] : null;  		
			
			$db->execute("UPDATE CDs SET id_artista = ?, nombre = ?, anio = ?, canciones= ?,thumbnail = ?, imagenes = ?, link = ? WHERE id_cd = ?",array($idAr,$nom,$anio,$canc,$thumb,$imgs,$link,$id));
			
			$cant_tag = (isset($_POST['cant_tag'])) ? $_POST['cant_tag'] : 0;
			$tags = array();
			for ($i=1;$i<=$cant_tag;$i++) {
				$tags[$i-1] = (isset($_POST['tag'.$i])) ? $_POST['tag'.$i] : "";
			}
			//Inserta TAGS (verifica si son tags q ya existen)
			$id_tags = addTags($db,$tags);
			$db->execute("DELETE FROM cd_tag WHERE id_cd = ?",array($id));
			foreach($id_tags as $idTag) {
				$db->execute("INSERT INTO cd_tag VALUES(?,?)",array($id,$idTag));
			}
			
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