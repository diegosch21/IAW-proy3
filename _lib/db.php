<?php


class DB {
	
	private $db; 
	
	function __construct($dbfile) {
		$crear = !file_exists($dbfile.'.sqlite'); 
		$this->db = new PDO('sqlite:'.$dbfile.'.sqlite');
		if($crear)
			$this->create($dbfile);
	}
	

	function create($dbfile) {
		$sql = file_get_contents($dbfile.'.sql');
		echo 'DB creada';
		
		$this->db->exec($sql);
	}
	
	function disconnect() {
		$db = null;
	}
	
	function query($sql) {
		return $this->db->query($sql);
	}
	
	function getRow($table) {
		return $table->fetch();
	}
	
}



?>