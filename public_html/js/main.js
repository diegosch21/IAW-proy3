$.noConflict();
jQuery(document).ready(function($) {
    
	new Carousel('example');
	
});	
	
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

	






