 var json = {
	"artista": "Encías Sangrantes",
	"website": "http://www.sangrantes.blogspot.com/",
	"descripcion": "Alequio: teclado y coros<br/>\
	Gaby: batería<br/>\
Gordo Pablo: percusión y coros<br/>\
Juan Cruz: voz y bajo<br/>\
Toto: voz y guitarra<br/>\
Zoty: malodión y armónica",
	"cds": [
	   {
		"nombre": "Encías Sangrantes", 
		"año": "2005",
		"imagen": "http://www.rock.com.ar/img/foto/disco/7/7473.jpg",
		"descripcion": "La lista de temas es:\
Tranky panky \
Felicidad \
Babilonia \
La cosecha \
Copate \
Contento\
La tormenta\
Moca ñamo\
Un poco mas\
Jugo de paty\
Campeon"
	   },
	   {
		"nombre": "Vehemencia", 
		"año": "2009",
		"imagen": "http://www.rock.com.ar/img/foto/disco/7/7474.jpg",
		"descripcion": "La lista de temas es:\
Rebozado \
Oye Bien \
Hasta \
El Pozo \
Keme Kemo \
Agua \
Santa Catalina \
Viajero \
Vuelo \
Flores \
Isabel "
	   },	  
	]
};

$.noConflict();

	
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

	






