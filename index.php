<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml");


session_start();
if (isset($_SESSION['user'])){
	if ($_SESSION['user']=='admin'){
		$maincontent = 'public_html/contents/admin.html';
		$login = 'public_html/contents/logout.html';
	}
		
}
else
{
	$maincontent = 'public_html/contents/home.html';
	$login = 'public_html/contents/login.html';
}
	
$desc->agregarItem('maincontent', $maincontent);
$desc->agregarItem('login', $login);

// Creo el parser.
$parser = new templateParser($desc->getTemplate());
$parser->parseTemplate($desc->getTags());

// Muestro la pagina generada.
echo $parser->display();
?>