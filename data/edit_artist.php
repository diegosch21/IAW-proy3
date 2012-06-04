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
else if(!isset($_POST['genero']) || $_POST['genero']==""){
	$result['error'] = 'Falta atributo genero';
}	
else if(!isset($_POST['nombre']) || $_POST['nombre']=="") {
	$result['error'] = 'Falta atributo nombre';
}	
else{
	
	$db = new DB('../datos/iaw_proy3');
	$id = $_POST['id'];
		
	$artistas = $db->query("SELECT COUNT() FROM artistas WHERE id_artista = $id");
	$exist = $db->getRow($artistas);
	
	if($exist[0] == 0) {
		//no existe artista
		$result['error'] = "Artista inexistente con ID=$id";
	}
	else {
		
		$nom = $_POST['nombre'];
		$artistas = $db->query("SELECT id_artista FROM artistas WHERE nombre LIKE '$nom' AND id_artista <> $id");
		$art = $db->getRow($artistas);
		if($art) {
			//ya existe artista
			$result['error'] = "Artista existente con ese nombre. ID=$art[0]";
		} 
		else {
					
			$gen = $_POST['genero'];
			$generos = $db->query("SELECT id_genero FROM generos WHERE nombre LIKE '$gen'");
			$genero = $db->getRow($generos);
			if(!$genero) {
				//Genero no existente: lo creo
				$generos = $db->query("SELECT MAX(id_genero) FROM generos");
				$genero = $db->getRow($generos);
				$idGen = $genero[0]+1;
				$db->execute("INSERT INTO generos VALUES(?, ?)",array($idGen,$gen));
			}
			else {
				$idGen = $genero[0];
			}
			
			$nac = (isset($_POST['nacion'])) ? $_POST['nacion'] : null;
			$banda = (isset($_POST['banda'])) ? $_POST['banda'] : null;
			/*
			$cant_img = (isset($_POST['cant_img'])) ? $_POST['cant_img'] : 0;
			$img = array();
			for ($i=1;$i<=$cant_img;$i++) {
				$img[$i-1] = (isset($_POST['img'.$i])) ? $_POST['img'.$i] : "";
			}
			 * */
			 
			$imgs = (isset($_POST['imgs'])) ? $_POST['imgs'] : "";
		 
		 
			
			$link = (isset($_POST['link'])) ? $_POST['link'] : null;  
			
			$db->execute("UPDATE artistas SET nombre = ?, id_genero = ?, nacionalidad = ?, banda= ?, imagenes=?, link = ? WHERE id_artista = ?",array($nom,$idGen,$nac,$banda,$imgs,$link,$id));
			
			$result = getArtist($db,$id);
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