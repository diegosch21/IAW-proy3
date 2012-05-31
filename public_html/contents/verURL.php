<?php
if(isset($_GET['showCD']) && isset($_GET['id'])){
	$id = $_GET['id'];	
	echo "<meta property='og:title' content='Titulo CD ID$id' />";
	echo "<meta property='og:image' content='http://4.bp.blogspot.com/_wiujx1SRUxE/SdolnuNJ5PI/AAAAAAAABVQ/qgErOb1F2ZQ/s320/Tapa+Encias+Sangrantes.jpg' />";
	echo "<meta property='og:url' content='http://localhost/IAW_proy3/index.php?showCD&amp;id=$id' />";
	 
	
	
}


?>