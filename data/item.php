<?php
$paginado = 3;

require_once('../_lib/db.php');

if(isset($_GET['ar']) && is_numeric($_GET['ar'])) {

$db = new DB('../db/iaw_proy3');
	
$ar = (int)$_GET['ar'];	
$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $ar");


if (!($db->getRow($artista))) {
	echo '<br/>vacio';
}
else {
	$infoArtista = $db->getRow($artista);
	$result = array();
	$result['id'] = $infoArtista['id'];
	$result['artista'] = $infoArtista['artista'];
	$result['genero'] = $infoArtista['genero'];
	$result['nacionalidad'] = $infoArtista['nacionalidad'];
	$result['banda'] = $infoArtista['banda'];
	$result['imagenes'] = explode('|-|',$infoArtista['imagenes']);
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
	foreach ($listaCDs as $cd) {		//PAGINAR
		$result['CDs'][$i] = array();
		$result['CDs'][$i]['id'] = $cd['id_cd'];
		$result['CDs'][$i]['nombre'] = $cd['nombre'];
		$result['CDs'][$i]['anio'] = $cd['anio'];
		$result['CDs'][$i]['canciones'] = $cd['canciones'];   //hacer explode
		$result['CDs'][$i]['thumbnail'] = $cd['thumbnail'];
		$result['CDs'][$i]['imagenes'] = explode('|-|',$cd['imagenes']);
		$result['CDs'][$i]['link'] = $cd['link'];
		$result['CDs'][$i]['visitas'] = $cd['visitas'];
		$result['CDs'][$i]['megusta'] = $cd['megusta'];
		$i++;
	}
	
}


echo json_encode($result);

$db->disconnect();

}
else if(isset($_GET['gen']) && is_numeric($_GET['gen'])){
	
	
	
}
else {	
	//devolver JSON vacio o con error
	echo '<br/>vacio';
}


?>