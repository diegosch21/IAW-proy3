<?php

require_once('../_lib/db.php');
try{

if(isset($_GET['id']) && is_numeric($_GET['id'])) {

	$db = new DB('../db/iaw_proy3');
		
	$ar = (int)$_GET['id'];	
	$db->exec("UPDATE artistas SET visitas = visitas+1 WHERE id_artista=$ar");
	$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $ar");
	
	
	$infoArtista = $db->getRow($artista);
	
	if (!($infoArtista))	{
		$error['error'] = "No existe artista con id=$ar";	
		echo json_encode($error);
	}
	else {
		
		$result = array();
		$result['id'] = $infoArtista['id'];
		$result['artista'] = $infoArtista['artista'];
		$result['genero'] = $infoArtista['genero'];
		$result['nacionalidad'] = $infoArtista['nacionalidad'];
		$result['banda'] = $infoArtista['banda'];
		$imgs = explode('|-|',$infoArtista['imagenes']);
		$result['imagenes'] = array();
		$k = 0;
		foreach($imgs as $img) {
			$result['imagenes'][$k] = array();
			$result['imagenes'][$k]['url'] = $img;	
			$k++;	
		}
		$result['link'] = $infoArtista['link'];
		$result['visitas'] = $infoArtista['visitas'];
		$result['megusta'] = $infoArtista['megusta'];
			
	}
	
	
	echo json_encode($result);
	
	$db->disconnect();

}

else {	
	
	$error['error'] = 'Falta parametro id';
	echo json_encode($error);
}

} catch(Exception $e){
	$error['error'] =$e->getMessage();
	echo json_encode($error);
}


?>