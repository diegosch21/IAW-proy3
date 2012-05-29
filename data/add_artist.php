<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try {

session_start();	

if (!isset($_SESSION['user'])){
	$result['error'] = 'Sesion no iniciada';
}
else if(!isset($_POST['genero']) || $_POST['genero']==""){
	$result['error'] = 'Falta atributo genero';
}	
else if(!isset($_POST['nombre']) || $_POST['nombre']=="") {
	$result['error'] = 'Falta atributo nombre';
}	
else{
	
	$db = new DB('../db/iaw_proy3');
	
	$nom = $_POST['nombre'];
	$artistas = $db->query("SELECT id_artista FROM artistas WHERE nombre LIKE '$nom'");
	$art = $db->getRow($artistas);
	if($art) {
		//ya existe artista
		$result['error'] = "Artista existente. ID=$art[0]";
	}
	else {
		$artistas = $db->query("SELECT MAX(id_artista) FROM artistas");
		$art = $db->getRow($artistas);
		$id = $art[0]+1;
				
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
		$imgs = (isset($_POST['imgs'])) ? $_POST['imgs'] : null;    //recibe un arreglo??? hacer implode(|-|)
		$link = (isset($_POST['link'])) ? $_POST['link'] : null;  
		
		$db->execute("INSERT INTO artistas VALUES(?,?,?,?,?,?,?,0,0)",array($id,$nom,$idGen,$nac,$banda,$imgs,$link));
		
		$result = getArtist($db,$id);

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