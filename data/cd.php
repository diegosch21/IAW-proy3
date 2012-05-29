<?php
require_once('../_lib/db.php');

try {

if(isset($_GET['id']) && is_numeric($_GET['id'])) { //id cd

	$db = new DB('../db/iaw_proy3');

	$id = $_GET['id'];
	$db->execute("UPDATE CDs SET visitas = visitas+1 WHERE id_cd= ?",array($id));
	$infoCD = $db->query("SELECT * FROM CDs WHERE id_cd = $id");
	
	$cd = $db->getRow($infoCD);
	
	if (!($cd))	{
		$error['error'] = "No existe CD con id=$id";	
		echo json_encode($error);
	}
	else {
		
		$result = array();
		$result['id'] = $id;
		$result['nombre'] = $cd['nombre'];
		$idAr = $cd['id_artista'];
		$result['id_artista'] = $idAr;
		
		$ar = $db->query("SELECT a.nombre as artista, g.nombre as genero FROM artistas a, generos g WHERE a.id_artista = $idAr AND a.id_genero = g.id_genero");
		if($ar){
			$artista = $db->getRow($ar);
			if($artista) {
				$result['artista'] = $artista['artista'];
				$result['genero'] = $artista['genero'];
			}
		}
		
		$result['anio'] = $cd['anio'];
		$result['canciones'] = $cd['canciones'];   //hacer explode
		$result['thumbnail'] = $cd['thumbnail'];
		$imgs = explode('|-|',$cd['imagenes']);
		$result['imagenes'] = array();
		$k = 0;
		foreach($imgs as $img) {
			$result['imagenes'][$k] = array();
			$result['imagenes'][$k]['url'] = $img;	
			$k++;	
		}
		
		$result['link'] = $cd['link'];
		$result['visitas'] = $cd['visitas'];
		$result['megusta'] = $cd['megusta'];
		
		$tags = $db->query("SELECT t.nombre as nombre FROM tags t NATURAL JOIN cd_tag ct WHERE ct.id_cd = $id");
		$result['tags'] = array();
		$j=0;
		foreach ($tags as $tag) {
			$result['tags'][$j] = array();
			$result['tags'][$j++]['tag'] = $tag['nombre'];
		}
		
	}
	echo json_encode($result);
	
	$db->disconnect();
		
	
} 
else {	
	
	$error['error'] = 'Falta parametro id';
	echo json_encode($error);
}

} catch(Exception $e){
	$error['error'] = $e->getMessage();
	echo json_encode($error);
}


?>