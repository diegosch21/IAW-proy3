<?php
$paginado = 3;

require_once('../_lib/db.php');

if(isset($_GET['ar']) && is_numeric($_GET['ar'])) {

	$db = new DB('../db/iaw_proy3');
		
	$ar = (int)$_GET['ar'];	
	$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $ar");
	
	
	$infoArtista = $db->getRow($artista);
	//if (!($db->getRow($artista))) {
	if (!($infoArtista))	{
		echo '<br/>vacio';
	}
	else {
		//$infoArtista = $db->getRow($artista);
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
			$result['imagenes'][$k++]['url'] = $img;	
		}
		$result['link'] = $infoArtista['link'];
		$result['visitas'] = $infoArtista['visitas'];
		$result['megusta'] = $infoArtista['megusta'];
		$result['CDs'] = array();
		if(isset($_GET['page']) && is_numeric($_GET['page'])) {
			$page = (int)$_GET['page'] - 1;	
			
		} else {
			$page = 0;
		}
		$desde = $page*$paginado;
		$hasta = $desde+$paginado;
		$listaCDs = $db->query("SELECT * FROM CDs WHERE id_artista = $ar LIMIT $desde , $hasta");
		$i=0;
		foreach ($listaCDs as $cd) {		
			$result['CDs'][$i] = array();
			$idCD = $cd['id_cd'];
			$result['CDs'][$i]['id'] = $idCD;
			$result['CDs'][$i]['nombre'] = $cd['nombre'];
			$result['CDs'][$i]['anio'] = $cd['anio'];
			$result['CDs'][$i]['canciones'] = $cd['canciones'];   //hacer explode
			$result['CDs'][$i]['thumbnail'] = $cd['thumbnail'];
			$imgs = explode('|-|',$cd['imagenes']);
			$result['CDs'][$i]['imagenes'] = array();
			$k = 0;
			foreach($imgs as $img) {
				$result['CDs'][$i]['imagenes'][$k] = array();
				$result['CDs'][$i]['imagenes'][$k++]['url'] = $img;	
			}
			$result['CDs'][$i]['link'] = $cd['link'];
			$result['CDs'][$i]['visitas'] = $cd['visitas'];
			$result['CDs'][$i]['megusta'] = $cd['megusta'];
			$tags = $db->query("SELECT t.nombre as nombre FROM tags t, cd_tag ct WHERE ct.id_cd = $idCD AND t.id_tag = ct.id_tag");
			$result['CDs'][$i]['tags'] = array();
			$j=0;
			foreach ($tags as $tag) {
				$result['CDs'][$i]['tags'][$j] = array();	
				$result['CDs'][$i]['tags'][$j++]['tag'] = $tag['nombre'];
			}
			
			$i++;
		}
		
	}
	
	
	echo json_encode($result);
	
	$db->disconnect();

}

else {	
	//devolver JSON vacio o con error
	echo '<br/>vacio';
}


?>