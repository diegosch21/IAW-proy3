<?php
require_once('../_lib/db.php');

try {

session_start();	

$db = new DB('../db/iaw_proy3');
	
if (isset($_SESSION['user']) && $_SESSION['user']== 'admin' && !(empty($_POST)) ) {
	$params = array();
	$params[0] = (isset($_POST['mode_destacados']) && ($_POST['mode_destacados']=='visitas' ||$_POST['mode_destacados']=='megusta' ||$_POST['mode_destacados']=='nuevo' ||$_POST['mode_destacados']=='random')) ? $_POST['mode_destacados'] : 'visitas'; 
	if (isset($_POST['mostrar_destacados']) && $_POST['mostrar_destacados']!="" ) {
		$params[1] = ($_POST['mostrar_destacados'] ) ? 1: 0;	
	}
	else {
		$params[1] = 1;
	}
	$params[2] = (isset($_POST['cant_destacados']) && is_numeric($_POST['cant_destacados'])) ? $_POST['cant_destacados'] : 5;
	$params[3] = (isset($_POST['order']) && ($_POST['order']=='nombre' ||$_POST['order']=='anio' ||$_POST['order']=='visitas' ||$_POST['order']=='megusta')) ? $_POST['order'] : 'anio'; 
	$params[4] = (isset($_POST['mode_order']) && ($_POST['mode_order']=='ASC' ||$_POST['mode_order']=='DESC' )) ? $_POST['mode_order'] : 'ASC'; 
	$params[5] = (isset($_POST['paginado']) && is_numeric($_POST['paginado'])) ? $_POST['paginado'] : 6;
	$params[6] = (isset($_POST['busqueda']) && ($_POST['busqueda']=='artista' ||$_POST['busqueda']=='cancion' ||$_POST['busqueda']=='cd' ||$_POST['busqueda']=='genero'||$_POST['busqueda']=='anio'||$_POST['busqueda']=='tag')) ? $_POST['busqueda'] : 'cd'; 
	
	$db->execute("UPDATE config SET mode_destacados = ?, mostrar_destacados = ?, cant_destacados = ?, orden= ?,mode_orden = ?, paginado = ?, busqueda = ?",$params);
	$result['update'] = true;
}
	
$conf = $db->query('SELECT * FROM config');   //si hay varios usuarios podria elegir config depende el user (NO IMPLEMENTADO)
$config = $db->getRow($conf);

$result['mode_destacados'] = $config['mode_destacados']; //visitas, megusta, nuevo, random
$result['mostrar_destacados'] = ($config['mostrar_destacados'] ==1) ? true : false;
$result['cant_destacados'] = $config['cant_destacados'];
$result['order'] = $config['orden']; //nombre, anio, visitas, megusta
$result['mode_order'] = $config['mode_orden']; //ASC, DESC
$result['paginado'] = $config['paginado']; //cant items x pag
$result['busqueda'] = $config['busqueda']; //busqueda default: artista, cancion, cd, genero, anio, tag

	
} catch(Exception $e){
	$result['error'] = $e->getMessage();
}

if(isset($result['error']))	
	echo json_encode($result);
else if(isset($result))
	echo json_encode($result);


?>