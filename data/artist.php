<?php
require_once('../_lib/db.php');
require_once('../_lib/data.php');

try{

if(isset($_GET['id']) && is_numeric($_GET['id'])) {
	$db = new DB('../datos/iaw_proy3');
	$id = (int)$_GET['id'];	
	$db->execute("UPDATE artistas SET visitas = visitas+1 WHERE id_artista= ?",array($id));
	$result = getArtist($db,$id);
	$db->disconnect();
}

else {	
	$result['error'] = 'Falta parametro id';

}

} catch(Exception $e){
	$result['error'] =$e->getMessage();
}

if(isset($result['error']))	
	echo json_encode($result);
else if(isset($result))
	echo json_encode($result);

?>