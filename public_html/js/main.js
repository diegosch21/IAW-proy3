$.noConflict();


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


function pedirPagina(query,state){
	jQuery('#loadingBusqueda').show();
	url= 'data/cds.php?'+query+'&page=1';
	s = "?busqueda=true&"+query;
	if(state && location.search != s) {
		window.history.pushState("index.php?busqueda&"+query, "Busqueda", "index.php"+s);
	}
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
										cambiar(query,page);
									  }
		});
		jQuery('#loadingBusqueda').hide();
		jQuery("#BusquedaContent").show("slow");
		
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
		jQuery("#CDContent").hide("slow");
		jQuery("#HomeContent").hide("slow");
		jQuery("#bandaContent").hide("slow");
		jQuery("#BusquedaContent").hide("slow");
		jQuery("#ItemContent").show("slow");
		lastquery = "tag="+tag;
		pedirPagina(lastquery,true);
		
}

	
jQuery(document).ready(function($) {
  
	$(window).bind('popstate', function(event) {
		if (event.originalEvent.state) {
			location.href = event.originalEvent.state;
		}
	});
		 	
	
	jQuery.getJSON('data/destacados.php',function(json) {
		for(i=0;i<json.CDs.length;i++){
			jQuery(".stage").append("<div class='item'><img width='300px' height='300px' src='"+json.CDs[i].imagen.url+"' alt='destacado'/><div class='text'><h3>"+json.CDs[i].artista+"</h3><h4>"+json.CDs[i].nombre+"</h4><p>"+json.CDs[i].genero+"</p></div></div>");
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
	jQuery("#addArtistSubmin").click(function(){

		if (jQuery("[name=element_7]select option:selected").val()=="nuevo")
			_genero = jQuery("#textNuevoGenero").val();
		else
			_genero = jQuery("[name=element_7]select option:selected").val();
		$.ajax({
			type: "POST",
			url: "data/add_artist.php",
			data: { genero: _genero, nombre: jQuery("#element_2").val(),nacion: jQuery("#element_5").val(), banda: jQuery("#element_4").val(),link: jQuery("#element_3").val() }
			}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista.artista+"</strong> fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
			}
			
		});
	//	location.reload();
	});
	
	jQuery("#editArtistSubmit").click(function(){
		$.ajax({
			type: "POST",
			url: "data/edit_artist.php",
			data: { id:jQuery("[name=element_8_edit]select option:selected").val(), genero: jQuery("#element_102").val(), nombre: jQuery("#element_101").val(),nacion: jQuery("#element_103").val(), banda: jQuery("#element_104").val(),link: jQuery("#element_105").val() }
			}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista+"</strong> fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
			}
		});
	//	location.reload();
	});
	jQuery("#editCDSubmit").click(function(){
		$.ajax({
			type: "POST",
			url: "data/edit_cd.php",
			data: { id:jQuery("[name=element_15_edit]select option:selected").val(),id_ar:jQuery("[name=element_14_edit]select option:selected").val(), genero: jQuery("[name=element_13_edit]select option:selected").val(), nombre: jQuery("#element_301").val(),anio: jQuery("#element_303").val(), canc: jQuery("#element_404").val(),link: jQuery("#element_405").val() }
			}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.nombre+"</strong> de "+dato.artista+" fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
			}
		});
	//	location.reload();
	});
	jQuery("#addCDSubmit").click(function(){
		$.ajax({
			type: "POST",
			url: "data/add_cd.php",
			data: { id_ar: jQuery("[name=element_12_edit]select option:selected").val(), nombre: jQuery("#element_200").val(), anio: jQuery("#element_201").val(), canc: jQuery("#element_204").val(), link: jQuery("#element_205").val()  }
			}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
				}
			else{
			alert(msg);
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.cd.nombre+"</strong> de "+dato.cd.artista+" fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
			}
		});
	//	location.reload();
	});
	
	jQuery("#deleteArtistSubmit").click(function(){
		$.ajax({
			type: "POST",
			url: "data/delete_artist.php",
			data: { id: jQuery("[name=element_8_edit]select option:selected").val() }
			}).done(function( msg ) {
			alert( "Data Saved: " + msg );
		});
	//	location.reload();
	});
	jQuery("#deleteCDSubmit").click(function(){
		$.ajax({
			type: "POST",
			url: "data/delete_cd.php",
			data: { id: jQuery("[name=element_15_edit]select option:selected").val() }
			}).done(function( msg ) {
			alert( "Data Saved: " + msg );
		});
	//	location.reload();
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
	
	
	if(getUrlVars()['showCD']) {
		verCD(getUrlVars()['showCD']);
	}
	else if (getUrlVars()['showArtist']) {
		loadItem(getUrlVars()['showArtist']);
	}
	
	
	jQuery("#imageArtistSubmitupload").click(function(){

		clas = 'artista'; idArt = jQuery("[name=element_8_edit]select option:selected").val();
		$.ajaxFileUpload
		(
			{
				url:'data/upload_img.php?id='+idArt+'&class='+clas,
				secureuri:false,
				fileElementId:'fileToUpload',
				data: { file:jQuery("#fileToUpload").val() },
				dataType: 'file',
				beforeSend:function()
				{
					$("#loadingImg").show();
				},
				complete:function()
				{
					$("#loadingImg").hide();
				},				
				success: function (data, status)
				{
					if(typeof(data.error) != 'undefined')
					{
						if(data.error != '')
						{
							alert(data.error);
						}else
						{
							alert(data.msg);
						}
					}
				},
				error: function (data, status, e)
				{
					alert(e);
				}
			}
		)
	});
	
	jQuery("#imageArtistSubmitURL").click(function(){
		$.ajax({
			type: "POST",
			url: "data/add_img.php",
			data: { class: 'artista', id:jQuery("[name=element_8_edit]select option:selected").val(), url:jQuery("#element_112").val() }
			}).done(function( msg ) {
			alert( "Data Saved: " + msg );
		});
		location.reload();
	});
	jQuery("#volverAlHome").click(function(){
		
	});

});  


