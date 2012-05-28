<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');
require_once('_lib/db.php');

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml");
$db = new DB("db/iaw_proy3");
//$db = openDB();

$cdcontent = 'public_html/contents/cd.html';
$maincontent = 'public_html/contents/home.html';
$itemcontent = 'public_html/contents/item.html';
$busquedacontent = 'public_html/contents/busqueda.html';

session_start();
if (isset($_SESSION['logged'])){
	if ($_SESSION['logged']=='admin'){   //ACA DEBERIA CONTROLARSE EL USUARIO CN LA BD
		if (!(empty($_GET['edit']))&&$_GET['edit']==true)
			$maincontent = 'public_html/contents/admin.html';
		$login = 'public_html/contents/menuAdmin.html';
	}
	
}
else if (isset($_SESSION['login_attempt']) && isset($_SESSION['error'])) {	
	$login = 'public_html/contents/loginError.php';	
	unset($_SESSION['login_attempt']);
}
else {
	$login = 'public_html/contents/login.html';	
}

$desc->agregarItem('cdcontent', $cdcontent);
$desc->agregarItem('busquedacontent', $busquedacontent);
$desc->agregarItem('itemcontent', $itemcontent);
$desc->agregarItem('maincontent', $maincontent);
$desc->agregarItem('login', $login);

// Creo el parser.
$parser = new templateParser($desc->getTemplate());
$parser->parseTemplate($desc->getTags());

// Muestro la pagina generada.
echo $parser->display();
?>