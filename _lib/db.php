<?php

function openDB() {
	//datos globales
	$dbfile="db/iaw_proy3.sqlite";
	$db = new PDO('sqlite'.$dbfile);
		
	createDB($db);
}

function createDB($db) {
	
}



function queryDB($query) {
	
}

function getRow($table) {
	
}
?>