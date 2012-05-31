function loadCategorias() {
	jQuery.getJSON('data/categorias.php',function(json) {
		var html="";
		for (i=0;i<json.length;i++) {
			html+='<div><h3><a href="#" class="TituloGenero">';
			html+=json[i].genero + '</a></h3> <div>';
			for (j=0;j<json[i].artistas.length;j++) {
				var ar = json[i].artistas[j];
				html+="<div><a href='#' onclick='loadItem("+ar.id+")' class='linkGenero'>"; 
				//html+="<a href='index.php?ar="+ar.id+"' class='linkGenero'>"; //no tiene q ser un link a otra pag
				html+=ar.artista+"</a></div>";
			}
			
			
			
			html+='</div></div>';
		}
		jQuery('#menuCategorias').html(html).accordion({ header: "h3" });
	});
}

jQuery(document).ready(function($) {

    loadCategorias();
});