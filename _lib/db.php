<?php

function openDB() {
	
	$dbfile = 'db/iaw_proy3.sqlite';
	$crear = !file_exists($dbfile); 
	$db = new PDO('sqlite:'.$dbfile);
	if($crear)
		create($db);
	return ($db);
	
}

function query($db,$sql) {
		return $db->query($sql);
}
	
function getRow($db,$table) {
		return $table->fetch();
}


function create($db) {
	$sql = file_get_contents('db/iaw_proy3.sql');
	echo 'DB creada';
	
	$db->exec($sql);
		
}



/*
class DB {
	
	private $bd; 
	
	function __construct($dbfile) {
		$this->bd = new PDO('sqlite:'.$dbfile);
		if (!file_exists($dbfile)) {
			create();
		}	
		var_dump($this->bd);
		$lala = $this->bd->prepare("SELECT pass FROM usuarios WHERE user='admin'");
		$lala->execute();
		$lolo = $lala->fetch();
		
	}
	
	
	function create() {
		
	}
	
	function query($sql) {
		return $this->bd->query($sql);
	}
	
	function getRow($table) {
		return $table->fetch();
	}
	
}
*/


?>