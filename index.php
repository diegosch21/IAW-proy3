<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml");


$maincontent = 'public_html/contents/home.html';

session_start();
if (isset($_SESSION['user'])){
	if ($_SESSION['user']=='admin'){
		if (!(empty($_GET['edit']))&&$_GET['edit']==true)
			$maincontent = 'public_html/contents/admin.html';
		$login = 'public_html/contents/menuAdmin.html';
	}
		
}
else
{	
	$login = 'public_html/contents/login.html';
}
//esto deberia hacerse con base de dato y generar el ensiassangrantes.html dinamicamente
if (!(empty($_GET['ar']))) {
	if($_GET['ar']=="enciassangrantes")
		$maincontent = 'public_html/contents/enciassangrantes.html';

}
	
$desc->agregarItem('maincontent', $maincontent);
$desc->agregarItem('login', $login);

// Creo el parser.
$parser = new templateParser($desc->getTemplate());
$parser->parseTemplate($desc->getTags());

// Muestro la pagina generada.
echo $parser->display();
?>