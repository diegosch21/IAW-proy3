
<?php

require_once('../_lib/db.php');

try {

$db = new DB('../datos/iaw_proy3');

$id = $_POST['id'];

$json = json_decode(file_get_contents('http://graph.facebook.com/?id=http://www.larockolacds.nixiweb.com/index.php?showCD='.$id));
if($json && $json->{'shares'}) {
   	$mg = $json->{'shares'};
   	$db->execute("UPDATE CDs SET megusta = ? WHERE id_cd= ?",array($mg,$id));
}

$db->disconnect();

} catch(Exception $e){
	echo $e->getMessage();
}



?>