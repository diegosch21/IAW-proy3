
<?php
/* ACTUALIZA LA CANTIDAD DE ME GUSTAS DE TODOS LOS CDs */
require_once('../_lib/db.php');

try {

$db = new DB('../db/iaw_proy3');

$infoCD = $db->query("SELECT MAX(id_cd) FROM CDs");
$cd = $db->getRow($infoCD);

for($i=1;$i<=$cd[0];$i++) {
	$json = json_decode(file_get_contents('http://graph.facebook.com/?id=http://www.larockolacds.nixiweb.com/index.php?showCD='.$i));
    var_dump($json);
    if($json && $json->{'shares'}) {
    	$mg = $json->{'shares'};
	   	$db->execute("UPDATE CDs SET megusta = ? WHERE id_cd= ?",array($mg,$i));
	}
}

$db->disconnect();

} catch(Exception $e){
	echo $e->getMessage();
}



?>