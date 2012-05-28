<?php

require_once('../_lib/db.php');

if(isset($_GET['ar']) && is_numeric($_GET['ar'])) {

	$db = new DB('../db/iaw_proy3');
		
	$ar = (int)$_GET['ar'];	
	$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $ar");
	
	
	$infoArtista = $db->getRow($artista);
	
	if (!($infoArtista))	{
		echo '<br/>vacio';
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
	//devolver JSON vacio o con error
	echo '<br/>vacio';
}


?>