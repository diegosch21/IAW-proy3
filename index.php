<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');
require_once('_lib/db.php');


$db = new DB("db/iaw_proy3");




if(isset($_GET['iframe']) && $_GET['iframe']) {
	$desc = new descriptor("conf/conf.xml","iframe");	
	$desc->cargar('titulo','titulo');
	$desc->cargar('maincontent','home');
	$desc->cargar('itemcontent','itemcontent');
	$desc->cargar('cdcontent','cdcontent');
	$desc->cargar('busquedacontent','busquedacontent');
}
else {

$maincontent = 'home';
session_start();

if (isset($_SESSION['user'])){
	if ($_SESSION['user']=='admin'){   
		if (!(empty($_GET['edit']))&&$_GET['edit']==true)
			$maincontent = 'admin';
		$login = 'menuAdmin';
	}
	else {
		$login = 'login';	
	}
}
else {
	$_SESSION['user']='visit';
	$login = 'login';	
}

if (isset($_SESSION['login_attempt']) && isset($_SESSION['error'])) {	
	$login = 'loginError';	
	unset($_SESSION['login_attempt']);
}

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml","template");	
$desc->cargar('titulo','titulo');
$desc->cargar('header','header');
$desc->cargar('footer','footer');
$desc->cargar('categorias','categorias');
$desc->cargar('maincontent',$maincontent);
$desc->cargar('itemcontent','itemcontent');
$desc->cargar('cdcontent','cdcontent');
$desc->cargar('busquedacontent','busquedacontent');
$desc->cargar('login',$login);
$desc->cargar('verURL','verURL');


}



// Creo el parser.
$parser = new templateParser($desc->getTemplate());
$parser->parseTemplate($desc->getTags());

// Muestro la pagina generada.
echo $parser->display();
?>