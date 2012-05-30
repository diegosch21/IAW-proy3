<?php
require_once('../_lib/db.php');

$db = new DB('../db/iaw_proy3');

$table = $db->query('SELECT g.id_genero as id_gen, g.nombre as genero, a.id_artista as id_ar, a.nombre as artista FROM generos g, artistas a WHERE g.id_genero = a.id_genero ORDER BY id_gen ASC');

$result = array();
$i=-1;
$gen="";

foreach ($table as $fila)
{
	if ($gen!=$fila['id_gen']) {
		$gen = $fila['id_gen'];	
		$result[++$i] = array();
		$result[$i]['id'] = $fila['id_gen'];	
		$result[$i]['genero'] = $fila['genero'];
		$result[$i]['artistas'] = array();
		$j=0;
	}	
	else
		$j++;	
	$result[$i]['artistas'][$j] = array();
	$result[$i]['artistas'][$j]['id'] =$fila['id_ar'];	
	$result[$i]['artistas'][$j]['artista'] =$fila['artista'];	
		
}


echo json_encode($result);


$db->disconnect();


?>