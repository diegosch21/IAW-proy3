<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');
require_once('_lib/db.php');

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml");
$db = new DB("db/iaw_proy3");
//$db = openDB();


$maincontent = 'public_html/contents/home.html';

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



//esto deberia hacerse con base de dato y generar el ensiassangrantes.html dinamicamente
if (!(empty($_GET['ar']))) {
	if($_GET['ar']=="1")
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