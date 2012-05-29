<?php
$paginado = 5;

require_once('../_lib/db.php');

try {

if(isset($_GET['page']) && is_numeric($_GET['page'])) {
	$page = (int)$_GET['page'] - 1;	
} else {
	$page = 0;
}
$desde = $page*$paginado;
$hasta = $desde+$paginado;


if(isset($_GET['order'])) {
	if($_GET['order'] == 'abc') {
		$order = 'nombre';
		$mode = 'ASC';
	}
	else if($_GET['order'] == 'anio'){
		$order = 'anio';
		$mode = 'ASC';
	}
	else if($_GET['order'] == 'vis'){
		$order = 'visitas';
		$mode = 'DESC';
	}
	else if($_GET['order'] == 'mg'){
		$order = 'megusta';
		$mode = 'DESC';
	}
	else{  
		$order = 'anio';
		$mode = 'DESC';
	}
}
else {
	$order = 'anio';
	$mode = 'ASC';
}

if(isset($_GET['mode'])) {
	if($_GET['mode'] == 'asc') {
		$mode = 'ASC';
	}
	else if($_GET['mode'] == 'desc'){
		$mode = 'DESC';
	}
}


$db = new DB('../db/iaw_proy3');


if(isset($_GET['ar']) && is_numeric($_GET['ar'])) { //id artista
	$ar = (int)$_GET['ar'];
	$listaCDs = $db->query("SELECT * FROM CDs WHERE id_artista = $ar ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs WHERE id_artista = $ar");
	if ($cantidad)
		$count = $db->getRow($cantidad);
} 
else if(isset($_GET['tag'])) {
	$tag = $_GET['tag'];	
	$listaCDs = $db->query("SELECT c.* FROM CDs c NATURAL JOIN cd_tag ct, tags t WHERE t.nombre = '$tag' AND t.id_tag = ct.id_tag ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs c NATURAL JOIN cd_tag ct, tags t WHERE t.nombre = '$tag' AND t.id_tag = ct.id_tag");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else if(isset($_GET['anio']) && is_numeric($_GET['anio'])) {
	$anio = (int)$_GET['anio'];	
	$listaCDs = $db->query("SELECT * FROM CDs WHERE anio = $anio ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs WHERE anio = $anio");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else if(isset($_GET['artista'])){
	$artista = $_GET['artista'];	
	$listaCDs = $db->query("SELECT c.* FROM CDs c, artistas a WHERE a.nombre LIKE '%$artista%' AND a.id_artista = c.id_artista ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs c, artistas a WHERE a.nombre LIKE '%$artista%' AND a.id_artista = c.id_artista");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else if(isset($_GET['genero'])){
	$gen = $_GET['genero'];	
	$listaCDs = $db->query("SELECT c.* FROM CDs c, artistas a, generos g WHERE g.nombre LIKE '%$gen%' AND a.id_artista = c.id_artista AND a.id_genero = g.id_genero ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs c, artistas a, generos g WHERE g.nombre LIKE '%$gen%' AND a.id_artista = c.id_artista AND a.id_genero = g.id_genero");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else if(isset($_GET['cd'])){ //nombre CD
	$cd = $_GET['cd'];	
	$listaCDs = $db->query("SELECT * FROM CDs WHERE nombre LIKE '%$cd%' ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs WHERE nombre LIKE '%$cd%'");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else if(isset($_GET['cancion'])){
	$cancion = $_GET['cancion'];	
	$listaCDs = $db->query("SELECT * FROM CDs WHERE canciones LIKE '%$cancion%' ORDER BY $order $mode LIMIT $desde , $paginado");
	$cantidad = $db->query("SELECT COUNT() FROM CDs WHERE canciones LIKE '%$cancion%' ");
	if ($cantidad)
		$count = $db->getRow($cantidad);
}
else {	
	//devolver JSON vacio o con error
	$result['error'] = 'Falta parametro de busqueda';
}	

if(isset($listaCDs) && $listaCDs && isset($count))	
{

	$result = array();
	$result['pag'] = $page+1;
	if ($page == 0)	
		$result['prev'] = false;
	else
		$result['prev'] = true;
	if ($hasta < $count[0])
		$result['next'] = true;
	else
		$result['next'] = false;
	$paginas = (int) ($count[0] / $paginado);	
	if ($count[0] % $paginado > 0)
		$paginas++;
	$result['pages'] = $paginas;
	$result['CDs']=array();
	$i=0; 
	foreach ($listaCDs as $cd) {		
		$result['CDs'][$i] = array();
		$idCD = $cd['id_cd'];
		$result['CDs'][$i]['id'] = $idCD;
		$result['CDs'][$i]['nombre'] = $cd['nombre'];
		$idAr = $cd['id_artista'];
		$result['CDs'][$i]['id_artista'] = $idAr;
		
		$ar = $db->query("SELECT a.nombre as artista, g.nombre as genero FROM artistas a, generos g WHERE a.id_artista = $idAr AND a.id_genero = g.id_genero");
		if($ar){
			$artista = $db->getRow($ar);
			if($artista) {
				$result['CDs'][$i]['artista'] = $artista['artista'];
				$result['CDs'][$i]['genero'] = $artista['genero'];
			}
		}
		
		$result['CDs'][$i]['anio'] = $cd['anio'];
		
		$result['CDs'][$i]['thumbnail'] = $cd['thumbnail'];
				
		$result['CDs'][$i]['visitas'] = $cd['visitas'];
		$result['CDs'][$i]['megusta'] = $cd['megusta'];
		
		$i++;
	}
	
	

}
else {
	$result['error'] = 'No se encontraron resultados';
}



$db->disconnect();

} catch (Exception $e){
	$result['error'] = $e->getMessage();
}

if(isset($result['error']))	
	echo json_encode($result);
else if(isset($result))
	echo json_encode($result);


?>