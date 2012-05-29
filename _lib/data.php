<?php
require_once('../_lib/db.php');

function getCD($db,$id) {
	$result = array();	
	$infoCD = $db->query("SELECT * FROM CDs WHERE id_cd = $id");
	$cd = $db->getRow($infoCD);
	if (!($cd))	{
		$result['error'] = "No existe CD con id=$id";	
	}
	else {
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
	
	
	return $result;	

}


function getArtist($db,$id) {
	$result = array();
	$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $id");
	$infoArtista = $db->getRow($artista);
	if (!($infoArtista))	{
		$result['error'] = "No existe artista con id=$id";	
	}
	else {
		$result['id'] = $id;
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
	
	return $result;
			
		
	
}



?>