//$.noConflict();


var info;
var lastquery;
var mode = "asc";
var order = "anio";

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function paginacion(query) {
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
									cambiar(query,page);
								  }
	});
}


function pedirPagina(query,state){
	jQuery('#loadingBusqueda').show();
	jQuery("#HomeContent").hide("slow");
	url= 'data/cds.php?'+query+'&page=1';

	s = "?busqueda=true&"+query;
	if(state && location.search != s) {
		window.history.pushState("index.php?busqueda&"+query, "Busqueda", "index.php"+s);
	}
   jQuery.getJSON(url,function(data) {
		info = data;
		var output = Mustache.render(jQuery("#templateB").html(), data);
		jQuery("#templateBusqueda").html(output);
		jQuery('#loadingBusqueda').hide();
		jQuery("#BusquedaContent").show("slow");
		jQuery('#ItemContent').show('slow');
		jQuery('#MainContent').show('slow');
		paginacion(query);
		
	});
  
}



function verCD(cd){
	jQuery('#loading').show();
	jQuery("#ItemContent").hide("slow");
	jQuery("#HomeContent").hide("slow");
	query = 'id='+cd;
	url= 'data/cd.php?'+query;
	s = "?showCD="+cd;
	if(location.search != s)
		window.history.pushState("index.php"+s, "CD id="+cd, "index.php"+s);
	jQuery.getJSON(url,function(data) {	
		
		var output = Mustache.render(jQuery("#templateCD").html(), data);
		jQuery("#cdTarget").html(output);	
		jQuery('#loading').hide();
		jQuery("#CDContent").show("slow");
		FB.XFBML.parse(document.getElementById("megusta"));
		FB.XFBML.parse(document.getElementById("comments"));
		
	});
	
}

function cambiar(query, pagina){
	jQuery('#loadingBusqueda').show();
	url= 'data/cds.php?'+query+'&page='+pagina;
	jQuery.getJSON(url,function(data) {
		info = data;
		var output = Mustache.render(jQuery("#templateB").html(), data)
		jQuery("#templateBusqueda").html(output);
		jQuery('#loadingBusqueda').hide();
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
	jQuery('#loading').show();
	jQuery("#CDContent").hide("slow");
	jQuery("#HomeContent").hide("slow");
	s = "?showArtist="+i;
	if (location.search != s)
		window.history.pushState("index.php"+s, "Artista", "index.php"+s);
    jQuery.getJSON('data/artist.php?id='+i,function(json) {
		var output = Mustache.render(jQuery("#template").html(), json)
		jQuery("#templateTarget").html(output);
		lastquery = "ar="+json.id;
		pedirPagina(lastquery,false);
		jQuery('#loading').hide();
		jQuery("#ItemContent").show("slow");
		jQuery("#bandaContent").show("slow");
		jQuery("#BusquedaContent").show("slow");
		
		
	});	  

}
function  busquedaTag(tag){
		lastquery = "tag="+tag;
		pedirPagina(lastquery,true);
		jQuery("#CDContent").hide("slow");
		jQuery("#HomeContent").hide("slow");
		jQuery("#BusquedaContent").show("slow");
		jQuery("#ItemContent").show("slow");
		jQuery("#bandaContent").hide("slow");
}

function actualizarMG(idCD) {
	jQuery.ajax({
		type: "POST",
		url: "data/likesFB.php",
		data: { id: idCD }
		});
}

function mostrarAutores() {

	jQuery('#fondo').show();
	jQuery("#autores").show();
}

function volverAutores(){
	jQuery('#fondo').hide();
	jQuery("#autores").hide();
}


	
jQuery(document).ready(function($) {
  

	
	
	$('span.autores').click(mostrarAutores);
	$('a.volverAutores').click(volverAutores);
	
	$(window).bind('popstate', function(event) {
		if (event.originalEvent.state) {
			location.href = event.originalEvent.state;
		}
	});
	
	//Analiza URL y carga la información pedida
	if(getUrlVars()['showCD']) {
		verCD(getUrlVars()['showCD']);
	}
	else if (getUrlVars()['showArtist']) {
		loadItem(getUrlVars()['showArtist']);
	}
	else if (getUrlVars()['busqueda']) {
	
		if (getUrlVars()['buscar']) {
			pedirPagina('buscar='+getUrlVars()['buscar'],true);
		}
		else if (getUrlVars()['cancion']) {
			pedirPagina('cancion='+getUrlVars()['cancion'],true);
		}
		else if (getUrlVars()['tag']) {
			pedirPagina('tag='+getUrlVars()['tag'],true);
		}
		else if (getUrlVars()['cd']) {
			pedirPagina('cd='+getUrlVars()['cd'],true);
		}
		else if (getUrlVars()['artista']) {
			pedirPagina('artista='+getUrlVars()['artista'],true);
		}
		else if (getUrlVars()['anio']) {
			pedirPagina('anio='+getUrlVars()['anio'],true);
		}
		else if (getUrlVars()['genero']) {
			pedirPagina('genero='+getUrlVars()['genero'],true);
		}
	}
		 	
	
	jQuery.getJSON('data/destacados.php',function(json) {
		for(i=0;i<json.CDs.length;i++){
			jQuery(".stage").append("<div class='item' style='text-align: center; font-size=medium;'><img width='300px' height='300px' src='"+json.CDs[i].imagen.url+"' alt='destacado'/><div class='text'><h3>"+json.CDs[i].artista+"</h3><h4>"+json.CDs[i].nombre+"</h4><p>"+json.CDs[i].genero+"</p></div></div>");
			jQuery(".thumbnails").append("<li><a rel='quickbox' href='#'><img width='90px' height='90px' src='"+json.CDs[i].thumbnail+"'/></a></li>");
		}
		  new Carousel('example');
		
	});	

	jQuery(".opAvanzadas").click(function(){
		jQuery(".opAvanzadas").hide("slow");
		jQuery(".avanzadas").show("slow");
		jQuery(".opBasicas").show("slow");
		
	});
	jQuery(".opBasicas").click(function(){
		jQuery(".opAvanzadas").show("slow");
		jQuery(".avanzadas").hide("slow");
		jQuery(".opBasicas").hide("slow");
		$('input:radio[name=tipo]').removeAttr("checked");

	});

	


	jQuery("#buttonSearch").click(function(){
		jQuery("#CDContent").hide("slow");
		jQuery("#HomeContent").hide("slow");
		jQuery("#bandaContent").hide("slow");
		jQuery("#ItemContent").hide("slow");
		jQuery("#BusquedaContent").hide("slow");	
		if ($('input:radio[name=tipo]').is(':checked'))
			lastquery = ""+$('input:radio[name=tipo]:checked').val()+'='+$('input[type=text][name=busqueda]').val();
		else
			lastquery = "buscar="+$('input[type=text][name=busqueda]').val();
		pedirPagina(lastquery,true);
		jQuery("#ItemContent").show("slow");

		
	});
	
	jQuery("input:radio[name=orden]").click(function(){
		var query = lastquery+'&order='+$('input:radio[name=orden]:checked').val();
		order = $('input:radio[name=orden]:checked').val();
		pedirPagina(query+"&mode="+mode,false);
	});
		
	jQuery("input:radio[name=mode]").click(function(){
		var query = lastquery+'&mode='+$('input:radio[name=mode]:checked').val();
		mode = $('input:radio[name=mode]:checked').val();
		pedirPagina(query+"&order="+order,false);
	});
	
	
	
	
	



});  


