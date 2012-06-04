<?php
try {

if(isset($_GET['showCD'])){
	require_once('/_lib/db.php');
	$db = new DB('datos/iaw_proy3');
	$id = $_GET['showCD'];	
	$infoCD = $db->query("SELECT nombre, thumbnail FROM CDs WHERE id_cd = $id");
	$cd = $db->getRow($infoCD);
	if ($cd)	{
		
		echo "<meta property='og:title' content='La Rockola CD: ".$cd['nombre']."' />";
		echo "<meta property='og:image' content='".$cd['thumbnail']."' />";
		echo "<meta property='og:url' content='http://www.larockolacds.nixiweb.com/index.php?showCD&amp;id=".$id."' />";
	}

}

} catch(Exception $e){
	//echo $e->getMessage();
}

?>