<?php
// Incluyo las clases php necesarias
require_once('_lib/parser.php');
require_once('_lib/descriptor.php');

// Creo el descriptor del sito web.
$desc = new descriptor("conf/conf.xml");


// Creo el parser.
$parser = new templateParser($desc->getTemplate());
$parser->parseTemplate($desc->getTags());

// Muestro la pagina generada.
echo $parser->display();
?>
