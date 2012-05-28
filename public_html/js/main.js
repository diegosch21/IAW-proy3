$.noConflict();
pedirPagina();
var info;
function pedirPagina(artista){
	url= 'data/cds.php?ar='+artista+'&page=1';
   jQuery.getJSON(url,function(data) {
		info = data;
		var output = Mustache.render(jQuery("#templateB").html(), data)
		jQuery("#templateBusqueda").html(output);
		jQuery("#paginate").paginate({
			count 		: info.pages,
			start 		: 1,
			display     : 5,
			border					: false,
			text_color  			: '#79B5E3',
			background_color    	: 'none',	
			text_hover_color  		: '#2573AF',
			background_hover_color	: 'none', 
			images		: false,
			mouse		: 'press',
			onChange     			: function(page){
										jQuery('._current','#paginacion').removeClass('_current').hide();
										jQuery('#p'+page).addClass('_current').show();
										cambiar(artista,page);
									  }
		});
	});
}
function verCD(cd){

	url= 'data/cd.php?id='+cd;
   jQuery.getJSON(url,function(data) {		
		var output = Mustache.render(jQuery("#templateCD").html(), data)
		jQuery("#cdTarget").html(output);		
	});

	jQuery("#CDContent").show();
	jQuery("#ItemContent").hide();
	
}
var info;
function cambiar(artista, pagina){
	url= 'data/cds.php?ar='+artista+'&page='+pagina;
   jQuery.getJSON(url,function(data) {
		info = data;
		var output = Mustache.render(jQuery("#templateB").html(), data)
		jQuery("#templateBusqueda").html(output);
	});
}
		
//valida que el campo no este vacio y no tenga solo espacios en blanco  
function validarLogin() {
	var user = jQuery("input#user").val();  
	var pass = jQuery("input#pass").val();
	
    if(vacio(user) || vacio(pass) ) {  
    	jQuery('#mensajeError').hide("normal");
    	jQuery('#mensajeVacio').show("normal");
    	return false;
    } else {  
    	return true;
	}  
	
}

//busca caracteres que no sean espacio en blanco en una cadena  
function vacio(q) {  
    for ( i = 0; i < q.length; i++ ) {  
        if ( q.charAt(i) != " " ) {  
                return false;  
        }  
    }  
    return true;  
} 


function loadItem(i) {  
	jQuery("#CDContent").hide();
	jQuery("#HomeContent").hide();
	jQuery("#ItemContent").show();
	jQuery("#BusquedaContent").show();
    jQuery.getJSON('data/artist.php?id='+i,function(json) {
		var output = Mustache.render(jQuery("#template").html(), json)
		jQuery("#templateTarget").html(output);
		pedirPagina(json.id);
	});
	

	  

}






