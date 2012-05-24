<?php

function openDB($dbfile) {
	$db = new PDO('sqlite:'.$dbfile);
	if (!file_exists($dbfile)) {
			create($db);
	}	
	return ($db);
	
}

function query($db,$sql) {
		return $db->query($sql);
}
	
function getRow($db,$table) {
		return $table->fetch();
}


function create($db) {
	$db->exec("CREATE TABLE 'CDs' ('id_cd' INTEGER PRIMARY KEY  NOT NULL ,'id_artista' INTEGER,'nombre' TEXT,'año' INTEGER,'canciones' TEXT,'imagenes' TEXT,'link' TEXT);
CREATE TABLE 'artistas' ('id_artista' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL , 'id_genero' INTEGER NOT NULL , 'nacionalidad' TEXT, 'banda' TEXT);
CREATE TABLE 'cd_tag' ('id_cd' INTEGER NOT NULL , 'id_tag' INTEGER NOT NULL );
CREATE TABLE 'generos' ('id_genero' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL );
CREATE TABLE 'tags' ('id_tag' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL );
CREATE TABLE usuarios ('user' TEXT NOT NULL, 'pass' TEXT NOT NULL);
INSERT INTO usuarios VALUES('admin','21232f297a57a5a743894a0e4a801fc3');");
		
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