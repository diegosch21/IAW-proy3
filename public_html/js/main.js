$.noConflict();
pedirPagina();
var info;
function pedirPagina(){
	url= 'data/cds.php?ar=1&page=1';
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
										cambiar(page);
									  }
		});
	});
}
var info;
function cambiar(pagina){
	url= 'data/cds.php?ar=1&page='+pagina;
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
	jQuery("#HomeContent").hide();
	jQuery("#ItemContent").show();
    jQuery.getJSON('data/item.php?ar='+i+'&page=1',function(json) {
		var output = Mustache.render(jQuery("#template").html(), json)
		jQuery("#templateTarget").html(output);
	});

	  

}






