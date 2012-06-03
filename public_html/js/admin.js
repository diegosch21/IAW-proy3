function listaGeneros() {
	jQuery("#loadingAdmin").show();
	jQuery.getJSON('data/categorias.php',function(data) {
		options ="<option value='' selected='selected'></option><option value='nuevo' >Nuevo g&eacute;nero</option>";
		for(i=0;i<data.length;i++){
			options+="<option value='"+data[i].genero+"' >"+data[i].genero+"</option>";
		}
		jQuery('#generoList').html(options);
		jQuery('#generoListEdir').html(options);
		jQuery('#generoListAddcd').html(options);
		jQuery('#generoListEditcd').html(options);
		jQuery("#loadingAdmin").hide();
	});	
}
	
	listaGeneros();
	
	jQuery('[name=element_7]').change(function () {
		if(jQuery("[name=element_7]select option:selected").val()=="nuevo"){
				jQuery("#li_88").show("slow");
			}
			else{
				jQuery("#li_88").hide("slow");
			}
		jQuery('#divDatos').show("slow");
	});	
	
	jQuery('[name=element_7_edit]').change(function () {
		jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
		jQuery('#li_9').show("slow");
		jQuery('#li_10').hide("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_7_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListEdir').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
		});
	});				

	jQuery('[name=element_8_edit]').change(function () {
		//jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
		jQuery('#li_10').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/artist.php?id='+jQuery("[name=element_8_edit]select option:selected").val(),function(data) {	
			jQuery('#element_101').val(data.artista);
			jQuery('#element_102').val(data.genero);
			jQuery('#element_103').val(data.nacionalidad);
			jQuery('#element_104').val(data.banda);
			jQuery('#element_105').val(data.link);
			for(i=0;i<data.imagenes.length;i++){
				jQuery('#imagenescargadas').append("<div class='tag2'>"+data.imagenes[i].url+"<div>");
			}
			jQuery("#loadingAdmin").hide();
		});
	});

	jQuery('[name=element_11_edit]').change(function () {
		jQuery('#artistListAddcd').html("<option value='' selected='selected'></option>");
		jQuery('#li_14').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php?',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_11_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListAddcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
		});
	});

	jQuery('[name=element_12_edit]').change(function () {
		//jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
		jQuery('#li_15').show("slow");
	});
	
	jQuery('[name=element_13_edit]').change(function () {
		jQuery('#li_18').hide("slow");
		jQuery('#li_19').hide("slow");
		jQuery('#cdListEditcd').html("<option value='' selected='selected'></option>");
		jQuery('#artistListEditcd').html("<option value='' selected='selected'></option>");
		jQuery('#li_17').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php?',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_13_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListEditcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
		});
	});	

	jQuery('[name=element_14_edit]').change(function () {	
		jQuery('#li_19').hide("slow");
		jQuery('#cdListEditcd').html("<option value='' selected='selected'></option>");
		jQuery('#li_18').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/cds.php?ar='+jQuery("[name=element_14_edit]select option:selected").val(),function(data) {
			for(i=0;i<data.CDs.length;i++){
				jQuery('#cdListEditcd').append("<option value='"+data.CDs[i].id+"' >"+data.CDs[i].nombre+"</option>");
			}	
			jQuery("#loadingAdmin").hide();
		});
	});	

	jQuery('[name=element_15_edit]').change(function () {					
		jQuery('#li_19').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/cd.php?id='+jQuery("[name=element_15_edit]select option:selected").val(),function(data) {	
			jQuery('#element_301').val(data.nombre);
			jQuery('#element_303').val(data.anio);
			jQuery('#element_304').val(data.canciones);
			jQuery('#element_305').val(data.link);
			jQuery("#loadingAdmin").hide();
		});
	});
			
	jQuery("#addArtistSubmin").click(function(){

		if (jQuery("[name=element_7]select option:selected").val()=="nuevo")
			_genero = jQuery("#textNuevoGenero").val();
		else
			_genero = jQuery("[name=element_7]select option:selected").val();
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/add_artist.php",
			data: { genero: _genero, nombre: jQuery("#element_2").val(),nacion: jQuery("#element_5").val(), banda: jQuery("#element_4").val(),link: jQuery("#element_3").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista.artista+"</strong> fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				jQuery("#addArtistSubmin").hide();
				jQuery("#li_211").show('slow');
				jQuery('#textNuevoGenero').attr('readonly', true);
				jQuery('#element_2').attr('readonly', true);
				jQuery('#element_3').attr('readonly', true);
				jQuery('#element_4').attr('readonly', true);
				jQuery('#element_5').attr('readonly', true);
				artID = dato.artista.id;
				
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	
	jQuery("#imageArtistSubmitURL2").click(function() {
		imgURL = jQuery("#imgURL2").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='') || (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: artID, url: imgURL, class:'artista' }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL2").val("");
					listoAdd();
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload2").click(function() {
/*		imgURL = jQuery("#imgURL2").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='') || (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: artID, url: imgURL, class:'artista' }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					listoAdd();
				}
				jQuery("#loadingAdmin").hide();
			});
		}*/
	});
	
			
	jQuery("#imageArtistSubmitlisto2").click(function() {
		listoAdd();
	});
	
function listoAdd() {
	jQuery("#addArtistSubmin").show();
	jQuery("#li_211").hide('slow');
	jQuery('#divDatos').hide("slow");
	jQuery("#li_88").hide("slow");
	jQuery("#li_7").hide("slow");
	jQuery('#textNuevoGenero').val("").removeAttr('readonly');
	jQuery('#element_2').val("").removeAttr('readonly');
	jQuery('#element_3').val("").removeAttr('readonly');
	jQuery('#element_4').val("").removeAttr('readonly');
	jQuery('#element_5').val("").removeAttr('readonly');
	artID = 0;
	listaGeneros();
}
	
	jQuery("#editArtistSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/edit_artist.php",
			data: { id:jQuery("[name=element_8_edit]select option:selected").val(), genero: jQuery("#element_102").val(), nombre: jQuery("#element_101").val(),nacion: jQuery("#element_103").val(), banda: jQuery("#element_104").val(),link: jQuery("#element_105").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista+"</strong> fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});

	jQuery("#editCDSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/edit_cd.php",
			data: { id:jQuery("[name=element_15_edit]select option:selected").val(),id_ar:jQuery("[name=element_14_edit]select option:selected").val(), genero: jQuery("[name=element_13_edit]select option:selected").val(), nombre: jQuery("#element_301").val(),anio: jQuery("#element_303").val(), canc: jQuery("#element_404").val(),link: jQuery("#element_405").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.nombre+"</strong> de "+dato.artista+" fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	
	jQuery("#guardarCambios").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/config.php",
			data: { mode_destacados: jQuery("[name=element_58]select option:selected").val(),mostrar_destacados: true,cant_destacados: jQuery("[name=element_59]select option:selected").val(), order: jQuery("[name=element_510]select option:selected").val(),mode_order: jQuery("[name=element_511]select option:selected").val(),paginado: jQuery("[name=element_512]select option:selected").val(),busqueda: "cd"}
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> Configuración guardada");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});

	jQuery("#addCDSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/add_cd.php",
			data: { id_ar: jQuery("[name=element_12_edit]select option:selected").val(), nombre: jQuery("#element_200").val(), anio: jQuery("#element_201").val(), canc: jQuery("#element_204").val(), link: jQuery("#element_205").val()  }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.cd.nombre+"</strong> de "+dato.cd.artista+" fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow');
				jQuery("#li_311").show();				
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
			
	jQuery("#deleteArtistSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/delete_artist.php",
			data: { id: jQuery("[name=element_8_edit]select option:selected").val() }
		}).done(function( msg ) {
			jQuery("#loadingAdmin").hide();
			
		});
	//	location.reload();
	});

	jQuery("#deleteCDSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/delete_cd.php",
			data: { id: jQuery("[name=element_15_edit]select option:selected").val() }
		}).done(function( msg ) {
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
				
/*
	jQuery("#imageArtistSubmitURL").click(function(){
		jQuery.ajax({
			type: "POST",
			url: "data/add_img.php",
			data: { class: 'artista', id:jQuery("[name=element_8_edit]select option:selected").val(), url:jQuery("#element_112").val() }
			}).done(function( msg ) {

		});
		//location.reload();

	});
*/
	jQuery("#Backup").click(function(){
		window.open("data/backup.php", '_blank');
	});
	
	
	jQuery("#break").click(function(){

		if(jQuery("#li_8").css("display")=="none"){
			jQuery("#li_8").show("slow");

		}
		 else{
			jQuery("#li_8").hide("slow");
			jQuery("#li_9").hide("slow");
			jQuery("#li_10").hide("slow");
		}
	});
	jQuery("#break0").click(function(){

		if(jQuery("#li_7").css("display")=="none"){
			jQuery("#li_7").show("slow");

		}
		 else{
			jQuery("#li_7").hide("slow");
			jQuery("#divDatos").hide("slow");
		}
	});
	jQuery("#break1").click(function(){

		if(jQuery("#li_13").css("display")=="none"){
			jQuery("#li_13").show("slow");

		}
		 else{
			jQuery("#li_13").hide("slow");
			jQuery("#li_14").hide("slow");
			jQuery("#li_15").hide("slow");

		}
	});
	jQuery("#break2").click(function(){

		if(jQuery("#li_16").css("display")=="none"){
			jQuery("#li_16").show("slow");

		}
		 else{
			jQuery("#li_16").hide("slow");
			jQuery("#li_17").hide("slow");
			jQuery("#li_18").hide("slow");
			jQuery("#li_19").hide("slow");
		}
	});
	jQuery("#imageArtistSubmit").click(function(){
		jQuery('#li_10').hide("slow");
		jQuery('#li_111').show("slow");
	
	});
	jQuery("#imageArtistSubmit2").click(function(){
		jQuery('#li_19').hide("slow");
		jQuery('#li_411').show("slow");
	
	});
	jQuery("#imageArtistSubmitlisto").click(function(){
		jQuery('#li_10').show("slow");
		jQuery('#li_111').hide("slow");
	
	});
			


		jQuery("#addArtistSubmin").button({
		   icons: {
		      primary: 'ui-icon ui-icon-circle-plus',
		   }
		});
		jQuery("#imageArtistSubmitlisto").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitlisto2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitlisto3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
			jQuery("#imageArtistSubmitlisto4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitlisto2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitupload").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitURL").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#editArtistSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-pencil',
		   }
		});		
		jQuery("#deleteArtistSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-trash',
		   }
		});
		jQuery("#imageArtistSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
				jQuery("#imageArtistSubmit2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#addCDSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-circle-plus',
		   }
		});
		jQuery("#editCDSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-pencil',
		   }
		});
		jQuery("#deleteCDSubmit").button({
		   icons: {
		      primary: 'ui-icon ui-icon-trash',
		   }
		});
		jQuery("#volverAlHome").button({
		   icons: {
		      primary: 'ui-icon ui-icon-circle-check',
		   }
		});


