<?php


function getCD($db,$id) {
	$result = array();	
	$infoCD = $db->query("SELECT * FROM CDs WHERE id_cd = $id");
	$cd = $db->getRow($infoCD);
	if (!($cd))	{
		$result['error'] = "No existe CD con id=$id";	
	}
	else {
		$result['id'] = $id;
		$result['nombre'] = $cd['nombre'];
		$idAr = $cd['id_artista'];
		$result['id_artista'] = $idAr;
		
		$ar = $db->query("SELECT a.nombre as artista, g.nombre as genero FROM artistas a, generos g WHERE a.id_artista = $idAr AND a.id_genero = g.id_genero");
		if($ar){
			$artista = $db->getRow($ar);
			if($artista) {
				$result['artista'] = $artista['artista'];
				$result['genero'] = $artista['genero'];
			}
		}
		
		$result['anio'] = $cd['anio'];
		$result['canciones'] = $cd['canciones'];   //hacer explode
		$result['thumbnail'] = $cd['thumbnail'];
		$imgs = explode('|-|',$cd['imagenes']);
		
		$k = 0;
		foreach($imgs as $img) {
			$result['imagenes'][$k] = array();
			$result['imagenes'][$k]['url'] = $img;	
			$k++;	
		}
		
		$result['link'] = $cd['link'];
		$result['visitas'] = $cd['visitas'];
		$result['megusta'] = $cd['megusta'];
		
		$tags = $db->query("SELECT t.nombre as nombre FROM tags t NATURAL JOIN cd_tag ct WHERE ct.id_cd = $id");
		
		$j=0;
		foreach ($tags as $tag) {
			$result['listatags']['tags'][$j++] = $tag['nombre'];
		}	
	}
	return $result;	

}


function getArtist($db,$id) {
	$result = array();
	$artista = $db->query("SELECT a.id_artista as id, a.nombre as artista, g.nombre as genero, a.nacionalidad as nacionalidad, a.banda as banda, a.imagenes as imagenes, a.link as link, a.visitas as visitas, a.megusta as megusta FROM artistas a, generos g WHERE a.id_artista = $id AND a.id_genero = g.id_genero");
	$infoArtista = $db->getRow($artista);
	if (!($infoArtista))	{
		$result['error'] = "No existe artista con id=$id";	
	}
	else {
		$result['id'] = $id;
		$result['artista'] = $infoArtista['artista'];
		$result['genero'] = $infoArtista['genero'];
		$result['nacionalidad'] = $infoArtista['nacionalidad'];
		$result['banda'] = $infoArtista['banda'];
		$imgs = explode('|-|',$infoArtista['imagenes']);
		
		$k = 0;
		foreach($imgs as $img) {
			$result['imagenes'][$k] = array();
			$result['imagenes'][$k]['url'] = $img;	
			$k++;	
		}
		$result['link'] = $infoArtista['link'];
		$result['visitas'] = $infoArtista['visitas'];
		$result['megusta'] = $infoArtista['megusta'];
			
	}
	
	return $result;
}


function addTags($db,$tags) {
	$id_tag = array();
	$i=0;
 	foreach($tags as $tag) {
 		if ($tag!="") {
	 		//verifico si ya existe
	 		$table = $db->query("SELECT id_tag FROM tags t WHERE nombre LIKE '$tag'");
			$row = $db->getRow($table);
			if ($row) { //ya existe tag
				$id_tag[$i] = $row[0];
			}
			else { //creo tag
				$table = $db->query("SELECT MAX(id_tag) FROM tags");
				$row = $db->getRow($table);
				$id_tag[$i] = $row[0]+1;	
				$db->execute("INSERT INTO tags VALUES(?,?)",array($id_tag[$i],$tag));
			}
			$i++;
		}
	}		
 	return $id_tag;		
				
}

function createFolder($path) {
	$folders = explode('/',$path);	
	$path='';
	foreach ($folders as $folder) {
		$path.=$folder;
		if(!is_dir($path)) 
			mkdir($path, 0777);  
		$path.='/';
	}
	
	 
}


function saveFile($file,$folder) {
	if ($file['size'] < 1000000 && ( stripos($file['type'],'jpeg') || stripos($file['type'],'gif') || stripos($file['type'],'png') ) ) {
		$temppath = $file['tmp_name'];
 		$filename = $file['name'];  
		$path = $folder.'/'.$filename;
		move_uploaded_file($temppath,$path);
		return $path;
	}
	else {
		return 'error';
	}
		
	
	
	
	
}


?>