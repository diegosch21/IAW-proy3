<?php
require_once('../_lib/db.php');

try {
	
$db = new DB('../datos/iaw_proy3');

/* CONFIGURACION DEFAULT */
$conf = $db->query('SELECT * FROM config');   //si hay varios usuarios podria elegir config depende el user (NO IMPLEMENTADO)
$config = $db->getRow($conf);

$cant = $config['cant_destacados']; 
$mode = $config['mode_destacados']; //visitas, megusta, nuevo, random


/*BUSQUEDA*/
switch($mode) {
	case 'visitas': {
		$listaCDs = $db->query("SELECT * FROM CDs ORDER BY visitas DESC LIMIT 0,$cant");
		break;
	}
	case 'megusta': {
		$listaCDs = $db->query("SELECT * FROM CDs ORDER BY megusta DESC LIMIT 0,$cant");
		break;
	}
	case 'nuevo': {
		$listaCDs = $db->query("SELECT * FROM CDs ORDER BY id_cd DESC LIMIT 0,$cant");
		break;
	}
	case 'random': {
		$table = $db->query("SELECT COUNT() FROM CDs");
		$total = $db->getRow($table);
		$ids = array();
		for($i=0;$i<$cant;$i++){
			do {
				$rand = mt_rand(1, $total[0]);
			} while (in_array($rand,$ids));
			$ids[$i] = $rand;
		}
		$s = '(' . implode(',',$ids) . ')';
		$listaCDs = $db->query("SELECT * FROM CDs WHERE id_cd IN $s ORDER BY anio ASC ");
		break;
	}	
	default: {
		$result['error'] = 'Falta modo de busqueda';
	}
}
	

if(isset($listaCDs) && $listaCDs)	
{

	$result = array();
	$result['mode'] = $mode;
	$result['cant'] = $cant;
	
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
		$imgs = explode('|-|',$cd['imagenes']);
		$result['CDs'][$i]['imagen']['url'] = $imgs[0];	
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