
jQuery(document).ready(function($) {
    
	$.getJSON('data/categorias.php',function(json) {
		var html="";
		for (i=0;i<json.length;i++) {
			html+='<div><h3><a href="#" class="TituloGenero">';
			html+=json[i].genero + '</a></h3> <div>';
			for (j=0;j<json[i].artistas.length;j++) {
				var ar = json[i].artistas[j];
				html+="<a href='index.php?ar="+ar.id+"' class='linkGenero'>";
				html+=ar.artista+"</a>";
			}
			
			
			
			html+='</div></div>';
		}
		$('#menuCategorias').html(html).accordion({ header: "h3" });

	});
	
	
	
});