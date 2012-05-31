<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try {

session_start();	

if (!isset($_SESSION['user']) || $_SESSION['user']!= 'admin'){
	$result['error'] = 'Sesion admin no iniciada';
}
else if(!isset($_POST['id']) || $_POST['id']=="" || !is_numeric($_POST['id'])){
	$result['error'] = 'Falta atributo id';
}	
else if(!isset($_POST['class']) || ( $_POST['class']!="artista" && $_POST['class']!="cd" )) {
	$result['error'] = 'Falta atributo class(artista o img)';
}	
else if(!isset($_POST['url']) || $_POST['url']==""){
	$result['error'] = 'Falta atributo url';
}
else{
	$url = $_POST['url'];
	
	$db = new DB('../db/iaw_proy3');
	
	$id = $_POST['id'];
	
	$class = $_POST['class'];
	
	if($class == 'artista') {
		$artistas = $db->query("SELECT id_genero, imagenes FROM artistas WHERE id_artista = $id");
		$art = $db->getRow($artistas);
	
		if(!$art) {
			//no existe artista
			$result['error'] = "Artista inexistente con ID=$id";
		}
		else {
			$idGen = $art['id_genero'];
			$imgs = $art['imagenes'];
			if ($imgs =="") {
				$imgs = $url;
			}
			else {
				$imgs .= '|-|'.$url;
			}
			
			$res = $db->execute("UPDATE artistas SET  imagenes = ? WHERE id_artista = ?",array($imgs,$id));
			
			$result['id'] = $id;
			$resul['class'] = $class;
			if($res > 0)
				$result['added'] = true;
			else {
				$result['added'] = false;
			}
			$result['listimgs'] = $imgs;
		}
			
	} elseif($class == 'cd') {
		$cds = $db->query("SELECT id_artista, imagenes FROM CDs WHERE id_cd = $id");
		$cd = $db->getRow($cds);
	
		if(!$cd) {
			//no existe artista
			$result['error'] = "CD inexistente con ID=$id";
		}
		else {
			$idArt = $cd['id_artista'];
			$imgs = $cd['imagenes'];
			if ($imgs =="") {
				$imgs = $url;
			}
			else {
				$imgs .= '|-|'.$url;
			}
			
			$res = $db->execute("UPDATE CDs SET  imagenes = ? WHERE id_cd = ?",array($imgs,$id));
			
			$result['id'] = $id;
			$resul['class'] = $class;
			if($res > 0)
				$result['added'] = true;
			else {
				$result['added'] = false;
			}
			$result['listimgs'] = $imgs;
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